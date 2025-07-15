import type { BaseItem, NotionPageContent } from '@/types';

// Validation utilities for data integrity

export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Environment variable validation
export function validateEnvironmentVariables(requiredVars: string[]): void {
  const missing: string[] = [];
  
  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  }
  
  if (missing.length > 0) {
    throw new ValidationError(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
}

// Notion data validation
export function validateNotionItem(item: any): item is BaseItem {
  if (!item || typeof item !== 'object') {
    return false;
  }
  
  // Check required fields
  if (!item.id || typeof item.id !== 'string') {
    console.warn('Invalid item: missing or invalid id', item);
    return false;
  }
  
  // Accept both 'title' and 'name' as the title field (for compatibility)
  const title = item.title || item.name;
  if (!title || typeof title !== 'string') {
    console.warn('Invalid item: missing or invalid title/name', item);
    return false;
  }
  
  return true;
}

export function validateNotionResponse(data: any): {
  isValid: boolean;
  validItems: BaseItem[];
  invalidItems: any[];
  errors: string[];
} {
  const errors: string[] = [];
  const validItems: BaseItem[] = [];
  const invalidItems: any[] = [];
  
  if (!data) {
    errors.push('Data is null or undefined');
    return { isValid: false, validItems, invalidItems, errors };
  }
  
  // Handle both cases: array directly or object with listItems property
  let itemsToValidate: any[];
  
  if (Array.isArray(data)) {
    itemsToValidate = data;
  } else if (data.listItems && Array.isArray(data.listItems)) {
    itemsToValidate = data.listItems;
  } else {
    errors.push('Data does not contain a valid array of items');
    return { isValid: false, validItems, invalidItems, errors };
  }
  
  for (const item of itemsToValidate) {
    if (validateNotionItem(item)) {
      validItems.push(item);
    } else {
      invalidItems.push(item);
      errors.push(`Invalid item structure: ${JSON.stringify(item)}`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    validItems,
    invalidItems,
    errors
  };
}

// URL validation
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Image URL validation
export function validateImageUrl(url?: string): string | null {
  if (!url || typeof url !== 'string') {
    return null;
  }
  
  if (!isValidUrl(url)) {
    return null;
  }
  
  // Check if it's an image extension
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const hasImageExtension = imageExtensions.some(ext => 
    url.toLowerCase().includes(ext)
  );
  
  return hasImageExtension ? url : null;
}

// Tag validation and cleaning
export function validateAndCleanTags(tags: any): string[] {
  if (!Array.isArray(tags)) {
    return [];
  }
  
  return tags
    .filter((tag): tag is string => typeof tag === 'string' && tag.trim().length > 0)
    .map(tag => tag.trim())
    .filter(tag => tag.length <= 50) // Reasonable tag length limit
    .slice(0, 10); // Limit number of tags
}

// Date validation
export function validateDate(date: any): Date | null {
  if (!date) return null;
  
  const parsedDate = new Date(date);
  
  if (isNaN(parsedDate.getTime())) {
    return null;
  }
  
  // Check if date is reasonable (not too far in the past or future)
  const now = new Date();
  const minDate = new Date('1900-01-01');
  const maxDate = new Date(now.getFullYear() + 10, 11, 31);
  
  if (parsedDate < minDate || parsedDate > maxDate) {
    return null;
  }
  
  return parsedDate;
}

// Content validation for security
export function sanitizeHtmlContent(content: string): string {
  if (!content || typeof content !== 'string') {
    return '';
  }
  
  // Basic HTML sanitization - remove script tags and dangerous attributes
  return content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/g, '')
    .replace(/javascript:/gi, '')
    .trim();
}

// Validate page content structure
export function validatePageContent(content: any[]): NotionPageContent[] {
  if (!Array.isArray(content)) {
    return [];
  }
  
  return content.filter((block): block is NotionPageContent => {
    return block && 
           typeof block === 'object' && 
           typeof block.type === 'string';
  });
}
