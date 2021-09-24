/* Copyright (c) 2021 BlackBerry Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

const databasePath = './bin/db/database.sqlite3';
const sqlite3 = require('sqlite3').verbose();
/* fs is part of core Node.js https://nodejs.org/api/fs.html */
const fs = require('fs');

const logger = require('./logger');

const databaseSingleton = function singleton() {
  const database = null;
  async function connect() {
    return new Promise((resolve) => {
      const db = new sqlite3.Database(databasePath);
      fs.stat(databasePath, (err) => {
        if (err == null) {
          resolve(db);
        } else if (err.code === 'ENOENT') {
          logger.log('info', 'No Database found, creating a new database');
          db.serialize(() => {
            db.run('CREATE TABLE devices (registration_token TEXT PRIMARY KEY)');
            db.run('CREATE TABLE detections (detection_id INTEGER PRIMARY KEY AUTOINCREMENT, event_type TEXT, event_name TEXT, device_name TEXT, file_path TEXT,interpreter TEXT, interpreter_version TEXT, zone_name TEXT, user_name TEXT, device_id TEXT, policy_name TEXT)');
          });
          resolve(db);
        } else {
          logger.log('error', `[Fatal] Some other error: ${err.code}`);
        }
      });
    });
  }
  // Get a reference of the database singleton via a promise
  async function get() {
    return new Promise((resolve) => {
      if (database != null) {
        logger.log('info', 'Database found. Already Exists... Connecting...');
        resolve(database);
      } else {
        connect().then((_database) => {
          logger.log('info', 'Database found. Connecting...');
          resolve(_database);
        });
      }
    });
  }

  return {
    get,
  };
};

module.exports = databaseSingleton();
