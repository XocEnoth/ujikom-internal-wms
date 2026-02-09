import { sql } from "../lib/db.js";

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
                    categories: {},
                };
            }

            const warehouse = warehousesMap[row.warehouse_id];

            if (!warehouse.categories[row.category_id]) {
                warehouse.categories[row.category_id] = {
                    id: row.category_id,
                    code: row.category_code,
                    name: row.category_name,
                    total_shelves: row.category_total_shelve,
                    shelves: [],
                };
            }

            warehouse.categories[row.category_id].shelves.push({
                id: row.shelves_id,
                name: row.shelves_name,
                status: row.shelves_status,
            });
        }

        const warehouses = Object.values(warehousesMap).map((w) => ({
            ...w,
            categories: Object.values(w.categories),
        }));

        return res.status(200).json({ warehouses });
    } catch (error) {
        console.error("Error in getDataWarehouse :\n\n", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
