'use server'

import { db } from '../db';
import { posts, categories, settings, pages } from '../db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// --- BLOG SETTINGS ---
export async function updateBlogSettings(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  // Coba update ID 1, kalau gak ada kita abaikan dulu buat sekarang
  await db.update(settings).set({ title, description }).where(eq(settings.id, 1));
  revalidatePath('/');
  revalidatePath('/dashboard');
}

// --- CATEGORIES ---
export async function addCategory(formData: FormData) {
  const name = formData.get('name') as string;
  if (!name) return;
  await db.insert(categories).values({ name });
  revalidatePath('/dashboard');
}

// --- POSTS ---
export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  if (!title || !content) return;
  await db.insert(posts).values({ title, content });
  revalidatePath('/');
  revalidatePath('/dashboard');
}

export async function removePost(id: number) {
  await db.delete(posts).where(eq(posts.id, id));
  revalidatePath('/');
  revalidatePath('/dashboard');
}
