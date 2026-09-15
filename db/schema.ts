import { sqliteTable,text,integer } from 'drizzle-orm/sqlite-core';
export const enquiries=sqliteTable('enquiries',{id:text('id').primaryKey(),kind:text('kind').notNull(),name:text('name').notNull(),email:text('email').notNull(),phone:text('phone').notNull(),vehicle:text('vehicle').notNull(),details:text('details').notNull(),createdAt:integer('created_at').notNull()});
