/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Entry, Scenario } from 'src/typings';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  entries = new BehaviorSubject([]);
  scenarios = new BehaviorSubject([]);

  private db: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'data.db',
        iosDatabaseLocation: 'Documents',
        location: 'Documents'
      })
      .then((db) => {
        this.db = db;
        this.seedDatabase();
      });
    });
  }

  seedDatabase() {
    alert('tfhg');
    this.db.sqlBatch([
      `CREATE TABLE IF NOT EXISTS entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        transcript TEXT,
        recording TEXT,
        dateAdded TEXT,
        tags TEXT);`,
      `CREATE TABLE IF NOT EXISTS scenarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        transcript TEXT,
        recording TEXT,
        dateAdded TEXT,
        tags TEXT);`
    ])
    .then(() => {
      this.dbReady.next(true);
    })
    .catch((err) => {
      alert(`SQL Transaction error: ${err}`);
    });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getEntries(): Observable<Entry[]> {
    return this.entries.asObservable();
  }

  getScenarios(): Observable<Scenario[]> {
    return this.scenarios.asObservable();
  }

  async loadEntries() {
    const data = await this.db.executeSql('SELECT * FROM entries', []);
    const entries: Entry[] = [];
    if (data.rows.length > 0) {
      for (let i = 0; i < data.rows.length; i++) {
        let tags = [];
        if (data.rows.item(i).tags !== '') {
          tags = JSON.parse(data.rows.item(i).tags);
        }

        entries.push({
          id: data.rows.item(i).id,
          name: data.rows.item(i).name,
          description: data.rows.item(i).description,
          transcript: data.rows.item(i).transcript,
          recording: data.rows.item(i).recording,
          tags,
          dateAdded: new Date(data.rows.item(i).dateAdded)
        });
      }
    }
    this.entries.next(entries);
  }

  async addEntry(name: string, description: string, transcript: string, recording: string, tags: string[]) {
    const data = [name, description, transcript, recording, JSON.stringify(tags), new Date().toISOString()];
    await this.db.executeSql('INSERT INTO entries (name, description, transcript, recording, tags, dateAdded) VALUES (?, ?, ?, ?, ?, ?)', data);
    this.loadEntries();
  }

  async deleteEntry(id: number) {
    await this.db.executeSql('DELETE FROM entries WHERE id = ?', [id]);
    this.loadEntries();
  }

  async updateEntry(entry: Entry) {
    const data = [entry.name, entry.description, entry.transcript, entry.recording, JSON.stringify(entry.tags), entry.dateAdded.toISOString()];
    await this.db.executeSql(`UPDATE entries SET name = ?, description = ?, transcript = ?, recording = ?, tags = ?, dateAdded = ? WHERE id = ${entry.id}`, data);
    this.loadEntries();
  }

}
