// database.js
// This file sets up and initializes our LowDB database
// 
// ⚠️ IMPORTANT: LowDB 7.x is ESM-only!
// - Must use import/export (not require/module.exports)
// - Must have "type": "module" in package.json

// TODO: Import JSONFilePreset from 'lowdb/node'
// Hint: import { JSONFilePreset } from 'lowdb/node';
import { JSONFilePreset } from 'lowdb/node';

// TODO: Define your default data structure
// This is what your database looks like when first created
// Replace 'yourResource' with your chosen resource name (e.g., tasks, books, movies)
const defaultData = { 
  students: [

    { id: 1, name: "Cuthbert L", email: "cl@email.com" },
    { id: 2, name: "John Butler", email: "JB@email.com"},
    { id: 3, name: "John Thames", email: "JT@email.com"},
    { id: 4, name: "Curtis Chamberlin", email: "CC@email.com"},
    { id: 5, name: "Rookie Davenport", email: "RD@email.com" },
    { id: 6, name: "Wall Banner", email: "WB@email.com"}
     

    ] 
};

// TODO: Initialize the database with JSONFilePreset
// Hint: await JSONFilePreset('db.json', defaultData)
// Note: Top-level await works in ESM!
const db = await JSONFilePreset('db.json', defaultData);

// Export the database so other files can use it
export default db;

/*
 * ====================================
 * LowDB 7.x Quick Reference
 * ====================================
 * 
 * READING DATA:
 *   await db.read();
 *   const items = db.data.yourResource;
 * 
 * CREATING (using update - recommended):
 *   await db.update(({ yourResource }) => yourResource.push(newItem));
 * 
 * CREATING (manual approach):
 *   await db.read();
 *   db.data.yourResource.push(newItem);
 *   await db.write();
 * 
 * UPDATING:
 *   await db.read();
 *   const index = db.data.yourResource.findIndex(item => item.id === id);
 *   db.data.yourResource[index] = updatedItem;
 *   await db.write();
 * 
 * DELETING:
 *   await db.update(({ yourResource }) => {
 *     const index = yourResource.findIndex(item => item.id === id);
 *     yourResource.splice(index, 1);
 *   });
 * 
 * ⚠️ GOTCHA: The db.json file won't exist until you write data for the first time!
 * 
 * ⚠️ LIMITATIONS (for learning only, not production):
 *   - Max ~1,000 records before performance issues
 *   - ~10MB file size limit
 *   - Full file rewrite on every save
 *   - No concurrent write support
 */
