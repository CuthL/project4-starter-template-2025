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
      allResources: 'GET /api/students',
      singleResource: 'GET /api/students/:id',
      createResource: 'POST /api/students',
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
app.get('/api/students', async (req, res) => {
  try {
    // 1. Read from the database
    await db.read();

    // 2. Get student array
    const students = db.data.students || [];

    // 3. Return success response
    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    console.error('Error in GET /api/students:', error);
    // 5. Handle errors
    res.status(500).json({
      success: false,
      message: 'Error retrieving students',
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
app.get('/api/students/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await db.read();

    // Find the student with matching ID
    const student = db.data.students.find(s => String(s.id) === String(id));

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });

    // 6. Found
    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    console.error('Error in GET /api/students/:id:', error);
    // 7. Handle errors
    res.status(500).json({
      success: false,
      message: 'Error retrieving student',
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
app.post('/api/students', async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      });
    }

    // Create new student
    const newStudent = {
      id: uuidv4(), // generate UUID
      name,
      email,
      createdAt: new Date().toISOString()
    };

    // Save to database
    await db.update(({ students }) => {
      students.push(newStudent);
    });

    res.status(201).json({
      success: true,
      data: newStudent
    });

  } catch (error) {
    console.error('Error in POST /api/students:', error);
    // 7. Handle errors
    res.status(500).json({
      success: false,
      message: 'Error creating students',
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
app.put('/api/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const changes = req.body;

    await db.read();

    // Find student index
    const index = db.data.students.findIndex(s => String(s.id) === String(id));

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Update student
    db.data.students[index] = {
      ...db.data.students[index],
      ...changes,
      updatedAt: new Date().toISOString()
    };

    await db.write();

    res.status(200).json({
      success: true,
      data: db.data.students[index]
    });

  } catch (error) {
    console.error('Error in PUT /api/students/:id:', error);
    // 11. Handle errors
    res.status(500).json({
      success: false,
      message: 'Error updating students',
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
app.delete('/api/students/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await db.read();

    const index = db.data.students.findIndex(s => String(s.id) === String(id));

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    let removedStudent;

    // Remove student
    await db.update(({ students }) => {
      removedStudent = students.splice(index, 1)[0];
    });

    // 7. Return deleted
    res.status(200).json({
      success: true,
      data: deletedItem
    });
  } catch (error) {
    console.error('Error in DELETE /api/resource/:id:', error);
    // 8. Handle errors
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