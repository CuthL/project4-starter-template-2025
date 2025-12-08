// server.js
// Main server file for your REST API
// 
// ⚠️ IMPORTANT: This uses ES Modules (ESM)
// - Use import/export (not require/module.exports)
// - File extensions (.js) are REQUIRED in imports
// - Must have "type": "module" in package.json

// TODO: Import required packages
// Note: File extension .js is REQUIRED for local imports in ESM!
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from './database.js';  // ⚠️ Don't forget the .js!




// TODO: Create Express app
const app = express();

// TODO: Set port number
const PORT = 3000;

// Middleware to parse JSON request bodies
// ✅ This is built into Express 4.16+ (no need for body-parser package!)
app.use(express.json());

// ============================================
// ROUTES
// ============================================

/**
 * GET / - Welcome route
 * Tests that the server is running
 */
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to my Project 4 REST API!',
    version: '1.0.0',
    endpoints: {
      allResources: 'GET /api/resource',
      singleResource: 'GET /api/resource/:id',
      createResource: 'POST /api/resource',
      updateResource: 'PUT /api/resource/:id',
      deleteResource: 'DELETE /api/resource/:id'
    }
  });
});

// ============================================
// CRUD OPERATIONS
// Replace 'resource' with your chosen resource name!
// ============================================

/**
 * GET /api/resource - Get all resources
 * 
 * TODO: Implement this endpoint
 * Steps:
 * 1. Use try/catch for error handling
 * 2. Read from database: await db.read()
 * 3. Get your resources array: db.data.yourResource
 * 4. Send response with status 200 and the data
 * 5. Handle errors with status 500
 */
app.get('/api/resource', async (req, res) => {
  try {
    // YOUR CODE HERE
    // Example:
    // await db.read();
    // const items = db.data.yourResource;
    // res.status(200).json({ success: true, count: items.length, data: items });
    
    res.status(501).json({ message: 'Not implemented yet - your turn!' });
  } catch (error) {
    console.error('Error in GET /api/resource:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving resources',
      error: error.message
    });
  }
});

/**
 * GET /api/resource/:id - Get a single resource by ID
 * 
 * TODO: Implement this endpoint
 * Steps:
 * 1. Use try/catch for error handling
 * 2. Get the id from req.params
 * 3. Read from database
 * 4. Find the resource using .find()
 * 5. If not found, return 404
 * 6. If found, return 200 with the data
 * 7. Handle errors with status 500
 */
app.get('/api/resource/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // YOUR CODE HERE
    // Example:
    // await db.read();
    // const item = db.data.yourResource.find(item => item.id === id);
    // if (!item) { return res.status(404).json({ success: false, message: 'Not found' }); }
    // res.status(200).json({ success: true, data: item });
    
    res.status(501).json({ message: 'Not implemented yet - your turn!' });
  } catch (error) {
    console.error('Error in GET /api/resource/:id:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving resource',
      error: error.message
    });
  }
});

/**
 * POST /api/resource - Create a new resource
 * 
 * TODO: Implement this endpoint
 * Steps:
 * 1. Use try/catch for error handling
 * 2. Get data from req.body
 * 3. Validate required fields (return 400 if missing)
 * 4. Create new resource object with:
 *    - id: uuidv4()
 *    - your fields from req.body
 *    - createdAt: new Date().toISOString()
 * 5. Add to database using: await db.update(({ yourResource }) => yourResource.push(newItem))
 * 6. Return 201 with the new resource
 * 7. Handle errors with status 500
 */
app.post('/api/resource', async (req, res) => {
  try {
    // YOUR CODE HERE
    // Example:
    // const { title, description } = req.body;
    // if (!title) { return res.status(400).json({ success: false, message: 'Title required' }); }
    // const newItem = { id: uuidv4(), title, description, createdAt: new Date().toISOString() };
    // await db.update(({ yourResource }) => yourResource.push(newItem));
    // res.status(201).json({ success: true, data: newItem });
    
    res.status(501).json({ message: 'Not implemented yet - your turn!' });
  } catch (error) {
    console.error('Error in POST /api/resource:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating resource',
      error: error.message
    });
  }
});

/**
 * PUT /api/resource/:id - Update an existing resource
 * 
 * TODO: Implement this endpoint
 * Steps:
 * 1. Use try/catch for error handling
 * 2. Get id from req.params
 * 3. Get update data from req.body
 * 4. Read database
 * 5. Find the resource index using .findIndex()
 * 6. If not found, return 404
 * 7. Update the resource (merge old and new data with spread operator)
 * 8. Add updatedAt timestamp
 * 9. Write to database: await db.write()
 * 10. Return 200 with updated resource
 * 11. Handle errors with status 500
 */
app.put('/api/resource/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // YOUR CODE HERE
    // Example:
    // await db.read();
    // const index = db.data.yourResource.findIndex(item => item.id === id);
    // if (index === -1) { return res.status(404).json({ success: false, message: 'Not found' }); }
    // db.data.yourResource[index] = { ...db.data.yourResource[index], ...req.body, updatedAt: new Date().toISOString() };
    // await db.write();
    // res.status(200).json({ success: true, data: db.data.yourResource[index] });
    
    res.status(501).json({ message: 'Not implemented yet - your turn!' });
  } catch (error) {
    console.error('Error in PUT /api/resource/:id:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating resource',
      error: error.message
    });
  }
});

/**
 * DELETE /api/resource/:id - Delete a resource
 * 
 * TODO: Implement this endpoint
 * Steps:
 * 1. Use try/catch for error handling
 * 2. Get id from req.params
 * 3. Read database
 * 4. Find the resource index using .findIndex()
 * 5. If not found, return 404
 * 6. Remove using db.update() with .splice()
 * 7. Return 200 with deleted resource
 * 8. Handle errors with status 500
 */
app.delete('/api/resource/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // YOUR CODE HERE
    // Example:
    // await db.read();
    // const index = db.data.yourResource.findIndex(item => item.id === id);
    // if (index === -1) { return res.status(404).json({ success: false, message: 'Not found' }); }
    // let deletedItem;
    // await db.update(({ yourResource }) => { deletedItem = yourResource.splice(index, 1)[0]; });
    // res.status(200).json({ success: true, data: deletedItem });
    
    res.status(501).json({ message: 'Not implemented yet - your turn!' });
  } catch (error) {
    console.error('Error in DELETE /api/resource/:id:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting resource',
      error: error.message
    });
  }
});

// ============================================
// 404 HANDLER - Catch all unmatched routes
// ============================================
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    requestedUrl: req.originalUrl
  });
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Test your API with Postman!`);
  console.log(`📊 Database file: db.json (created after first write)`);
});

/*
 * ====================================
 * ESM QUICK REFERENCE
 * ====================================
 * 
 * ❌ CommonJS (OLD - don't use):
 *   const express = require('express');
 *   module.exports = router;
 * 
 * ✅ ESM (CURRENT - use this):
 *   import express from 'express';
 *   export default router;
 * 
 * ⚠️ LOCAL IMPORTS NEED .js EXTENSION:
 *   import db from './database.js';  // ✅ Correct
 *   import db from './database';     // ❌ Will fail!
 * 
 * ====================================
 * EXPRESS QUICK REFERENCE
 * ====================================
 * 
 * req.params  → URL parameters (/api/games/:id → req.params.id)
 * req.body    → POST/PUT request body (parsed by express.json())
 * req.query   → Query string (/api/games?genre=rpg → req.query.genre)
 * 
 * res.status(200).json({}) → Send JSON response with status
 * res.json({})             → Send JSON (default 200)
 * 
 * Status codes:
 *   200 - OK (GET, PUT, DELETE success)
 *   201 - Created (POST success)
 *   400 - Bad Request (validation error)
 *   404 - Not Found (resource doesn't exist)
 *   500 - Server Error (something broke)
 */
