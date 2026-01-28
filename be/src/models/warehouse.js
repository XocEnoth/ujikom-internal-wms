import { sql } from "../lib/db.js";
import getLast31DaysChartData from "../lib/getLast31DaysChartData.js";
import getTrend from "../lib/getTrend.js";
import getTrendValue from "../lib/getTrendValue.js";
import groupByMonthAndPayment from "../lib/groupByMonthAndPayment.js";
import getTotalAmount from "../lib/getTotalAmount.js";
import calculatePaymentPercentage from "../lib/calculatePaymentPercentage.js";

export const getDataWarehouse = async (req, res) => {
    try {
        const [rows] = await sql.query(
            `SELECT
                warehouses.id AS warehouse_id,
                warehouses.name AS warehouse_name,
                categories.id AS category_id,
                categories.code AS category_code,
                categories.name AS category_name,
                categories.total_shelves AS category_total_shelve,
                shelves.id AS shelves_id,
                shelves.shelve_name AS shelves_name,
                shelves.status AS shelves_status
            FROM
                warehouses
            INNER JOIN
                categories
            ON
                categories.warehouse_id = warehouses.id
            INNER JOIN
                shelves
            ON
                shelves.category_id = categories.id
            WHERE
                warehouses.record_status = 1
            AND
                categories.record_status = 1
            AND
                shelves.record_status = 1
            ORDER BY
                warehouses.id
            `,
        );

        const warehousesMap = {};

        for (const row of rows) {
            if (!warehousesMap[row.warehouse_id]) {
                warehousesMap[row.warehouse_id] = {
                    id: row.warehouse_id,
                    name: row.warehouse_name,
                    categories: [],
                };
            }

            warehousesMap[row.warehouse_id].categories.push({
                id: row.category_id,
                code: row.category_code,
                name: row.category_name,
                total_shelves: row.category_total_shelve,
                shelves: [
                    {
                        id: row.shelves_id,
                        name: row.shelves_name,
                        status: row.shelves_status,
                    },
                ],
            });
        }

        const warehouses = Object.values(warehousesMap);

        return res.status(200).json({ warehouses });
    } catch (error) {
        console.error("Error in getDataWarehouse :\n\n", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

export const getStatsOrder = async (req, res) => {
    try {
        // Delivered raw
        const [totalDelivered] = await sql.query(
            `SELECT
                COUNT(*) as total
            FROM
                shipments
            WHERE
                status = 'delivered'
            AND
                delivered_at >= DATE_SUB(NOW(), INTERVAL 31 DAY)
            `,
        );
        const [dataDelivered] = await sql.query(
            `SELECT
                delivered_at
            FROM
                shipments
            WHERE
                status = 'delivered'
            AND
                delivered_at >= DATE_SUB(NOW(), INTERVAL 31 DAY)
            `,
        );
        // Shipped raw
        const [totalShipped] = await sql.query(
            `SELECT
                COUNT(*) as total
            FROM
                shipments
            WHERE
                status = 'shipped'
            AND
                shipped_at >= DATE_SUB(NOW(), INTERVAL 31 DAY)
            `,
        );
        const [dataShipped] = await sql.query(
            `SELECT
                shipped_at
            FROM
                shipments
            WHERE
                status = 'shipped'
            AND
                shipped_at >= DATE_SUB(NOW(), INTERVAL 31 DAY)
            `,
        );
        // Returned raw
        const [totalReturned] = await sql.query(
            `SELECT
                COUNT(*) as total
            FROM
                returns
            WHERE
                returned_at >= DATE_SUB(NOW(), INTERVAL 31 DAY)
            `,
        );
        const [dataReturned] = await sql.query(
            `SELECT
                returned_at
            FROM
                returns
            WHERE
                returned_at >= DATE_SUB(NOW(), INTERVAL 31 DAY)
            `,
        );
        // Cancelled raw
        const [totalCancelled] = await sql.query(
            `SELECT
                COUNT(*) as total
            FROM
                cancellations
            WHERE
                cancelled_at >= DATE_SUB(NOW(), INTERVAL 31 DAY)
            `,
        );
        const [dataCancelled] = await sql.query(
            `SELECT
                cancelled_at
            FROM
                cancellations
            WHERE
                cancelled_at >= DATE_SUB(NOW(), INTERVAL 31 DAY)
            `,
        );
        // Order Payment
        const [orderPayment] = await sql.query(
            `SELECT
                payment_method, date_created, total_amount
            FROM
                orders
            WHERE
                date_created >= MAKEDATE(YEAR(NOW()), 1)
            AND
                date_created <= NOW()
            AND (
                    status = 'delivered'
                OR  status = 'shipped'
            )
            AND
                record_status = 1
            ORDER BY
                payment_method DESC
            `,
        );

        // Delivered
        const valueDelivered = totalDelivered[0].total;
        const chartDataDelivered = await getLast31DaysChartData(
            dataDelivered,
            "delivered_at",
        );
        const trendDelivered = await getTrend(chartDataDelivered);
        const trendValueDelivered = await getTrendValue(chartDataDelivered);
        // Shipped
        const valueShipped = totalShipped[0].total;
        const chartDataShipped = await getLast31DaysChartData(
            dataShipped,
            "shipped_at",
        );
        const trendShipped = await getTrend(chartDataShipped);
        const trendValueShipped = await getTrendValue(chartDataShipped);
        // Returned
        const valueReturned = totalReturned[0].total;
        const chartDataReturned = await getLast31DaysChartData(
            dataReturned,
            "returned_at",
        );
        const trendReturned = await getTrend(chartDataReturned);
        const trendValueReturned = await getTrendValue(chartDataReturned);
        // Cancelled
        const valueCancelled = totalCancelled[0].total;
        const chartDataCancelled = await getLast31DaysChartData(
            dataCancelled,
            "cancelled_at",
        );
        const trendCancelled = await getTrend(chartDataCancelled);
        const trendValueCancelled = await getTrendValue(chartDataCancelled);
        // Order Payment
        const order = await groupByMonthAndPayment(orderPayment);
        const totalOrder =
            order.cod.reduce((sum, val) => sum + val, 0) +
            order.prepaid.reduce((sum, val) => sum + val, 0);
        const totalAmount = await getTotalAmount(orderPayment);
        const paymentPercentage =
            await calculatePaymentPercentage(orderPayment);

        return res.status(200).json({
            delivered: {
                value: valueDelivered,
                chartData: chartDataDelivered,
                trend: trendDelivered,
                trendValue: trendValueDelivered,
            },
            shipped: {
                value: valueShipped,
                chartData: chartDataShipped,
                trend: trendShipped,
                trendValue: trendValueShipped,
            },
            returned: {
                value: valueReturned,
                chartData: chartDataReturned,
                trend: trendReturned,
                trendValue: trendValueReturned,
            },
            cancelled: {
                value: valueCancelled,
                chartData: chartDataCancelled,
                trend: trendCancelled,
                trendValue: trendValueCancelled,
            },
            order: {
                ...order,
                totalOrder,
                totalAmount,
                paymentPercentage,
            },
        });
    } catch (error) {
        console.error("Error in getStatsOrder :\n\n", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

export const getOrders = async (req, res) => {
    try {
        const [orders] = await sql.query(
            `SELECT
                orders.id,
                orders.order_number,
                customers.name,
                orders.payment_method,
                orders.status,
                orders.total_amount,
                orders.date_created,
                orders.created_by,
                orders.date_updated,
                orders.updated_by
            FROM
                orders
            INNER JOIN
                customers
            ON
                orders.customer_id = customers.id
            WHERE
                orders.record_status = 1
            `,
        );
        return res.status(200).json({ orders: orders });
    } catch (error) {
        console.error("Error in getOrders :\n\n", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

export const getOrderDetailsById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Order ID is required." });
        }
        const [orders] = await sql.query(
            `SELECT
                orders.order_number,
                orders.date_created,
                orders.status,
                customers.name AS customer_name,
                customers.email,
                customers.address,
                orders.payment_method,
                products.name AS product_name,
                products.price,
                order_items.quantity,
                orders.total_amount
            FROM
                orders
            INNER JOIN
                customers
            ON
                orders.customer_id = customers.id
            INNER JOIN
                order_items
            ON
                orders.id = order_items.order_id
            INNER JOIN
                products
            ON
                order_items.product_id = products.id
            WHERE
                orders.id = ?
            AND
                orders.record_status = 1
            AND
                order_items.record_status = 1
            AND
                products.record_status = 1
            AND
                customers.record_status = 1
            `,
            [id],
        );
        return res.status(200).json({ orders: orders });
    } catch (error) {
        console.error("Error in getOrderDetailsById :\n\n", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

export const editOrderDetailsByOrderNumber = async (req, res) => {
    try {
        const { ordernumber } = req.params;
        if (!ordernumber) {
            return res
                .status(400)
                .json({ message: "Order Number is required." });
        }

        const customer_address = req?.body?.customer_address;
        const customer_email = req?.body?.customer_email;
        const customer_name = req?.body?.customer_name;
        const payment_method = req?.body?.payment_method;
        const status = req?.body?.status;

        if (
            !customer_address &&
            !customer_email &&
            !customer_name &&
            !payment_method &&
            !status
        ) {
            return res.status(202).json({ status: 202 });
        }

        if (
            status !== "received" &&
            status !== "shipped" &&
            status !== "delivered" &&
            status !== "returned" &&
            status !== "cancelled" &&
            status !== ""
        ) {
            return res.status(202).json({ status: 202 });
        }

        if (
            payment_method !== "cod" &&
            payment_method !== "prepaid" &&
            payment_method !== ""
        ) {
            return res.status(202).json({ status: 202 });
        }

        const [getCustomerId] = await sql.query(
            `SELECT
                customer_id
            FROM
                orders
            WHERE
                order_number = ?
            LIMIT 1;`,
            [ordernumber],
        );

        await sql.query(
            `UPDATE
                customers
            SET
                name = ?,
                email = ?,
                address = ?,
                updated_by = 'SYSTEM'
            WHERE
                id = ?`,
            [
                customer_name,
                customer_email,
                customer_address,
                getCustomerId[0]?.customer_id,
            ],
        );

        await sql.query(
            `UPDATE
                orders
            SET
                payment_method = ?,
                status = ?,
                updated_by = 'SYSTEM'
            WHERE
                order_number = ?`,
            [payment_method, status, ordernumber],
        );

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error in editOrderDetailsByOrderNumber :\n\n", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

export const deleteOrderDetailsById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Id is required." });
        }

        await sql.query(
            `UPDATE
                orders
            SET
                record_status = 0,
                updated_by = 'SYSTEM'
            WHERE
                id = ?`,
            [id],
        );
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error in deleteOrderDetailsById :\n\n", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

export const getShipments = async (req, res) => {
    try {
        const [shipments] = await sql.query(
            `SELECT
                shipments.id,
                orders.order_number,
                shipments.courier,
                shipments.tracking_number,
                shipments.shipped_at,
                shipments.delivered_at,
                shipments.status
            FROM
                shipments
            INNER JOIN
                orders
            ON
                shipments.order_id = orders.id
            `,
        );
        return res.status(200).json({ shipments: shipments });
    } catch (error) {
        console.error("Error in getOrders :\n\n", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
