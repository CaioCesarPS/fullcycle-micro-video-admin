import { Category } from '../category.entity';

describe('Category Unit Tests', () => {
  describe('constructor', () => {
    test('should create a category passing only the name', () => {
      const category = new Category({
        name: 'Movie',
      });

      expect(category.category_id).toBeUndefined();
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    test('should create a category passing all props without category_id', () => {
      const created_at = new Date();
      const category = new Category({
        name: 'Movie',
        description: 'Movies category',
        is_active: false,
        created_at,
      });

      expect(category.category_id).toBeUndefined();
      expect(category.name).toBe('Movie');
      expect(category.description).toBe('Movies category');
      expect(category.is_active).toBeFalsy();
      expect(category.created_at).toBe(created_at);
    });
  });

  describe('create command', () => {
    test('should create a category', () => {
      const category = Category.create({
        name: 'Movie',
      });

      expect(category.category_id).toBeUndefined();
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    test('should create a category with description', () => {
      const category = Category.create({
        name: 'Movie',
        description: 'Movies category',
      });

      expect(category.category_id).toBeUndefined();
      expect(category.name).toBe('Movie');
      expect(category.description).toBe('Movies category');
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    test('should create a category with is_active', () => {
      const category = Category.create({
        name: 'Movie',
        is_active: false,
      });

      expect(category.category_id).toBeUndefined();
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBeFalsy();
      expect(category.created_at).toBeInstanceOf(Date);
    });
  });

  describe('Change name', () => {
    test('should change the name', () => {
      const category = Category.create({
        name: 'Movie',
      });

      category.changeName('Books');

      expect(category.name).toBe('Books');
    });
  });

  describe('Change description', () => {
    test('should change the description', () => {
      const category = Category.create({
        name: 'Movie',
      });

      category.changeDescription('Movies category');

      expect(category.description).toBe('Movies category');
    });
  });

  describe('Activate', () => {
    test('should activate the category', () => {
      const category = Category.create({
        name: 'Movie',
        is_active: false,
      });

      category.activate();

      expect(category.is_active).toBeTruthy();
    });
  });

  describe('Deactivate', () => {
    test('should deactivate the category', () => {
      const category = Category.create({
        name: 'Movie',
      });

      category.deactivate();

      expect(category.is_active).toBeFalsy();
    });
  });
});
