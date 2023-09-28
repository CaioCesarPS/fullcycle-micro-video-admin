import { Uuid } from '../../../shared/domain/value-objects/uuid.vo';
import { Category } from '../category.entity';

describe('Category Unit Tests', () => {
  let validateSPy: any;
  beforeEach(() => {
    validateSPy = jest.spyOn(Category, 'validate');
  });
  describe('constructor', () => {
    test('should create a category passing only the name', () => {
      const category = new Category({
        name: 'Movie',
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
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

      expect(category.category_id).toBeInstanceOf(Uuid);
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

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSPy).toBeCalledWith(category);
      expect(validateSPy).toHaveBeenCalledTimes(1);
    });

    test('should create a category with description', () => {
      const category = Category.create({
        name: 'Movie',
        description: 'Movies category',
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBe('Movies category');
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSPy).toBeCalledWith(category);
      expect(validateSPy).toHaveBeenCalledTimes(1);
    });

    test('should create a category with is_active', () => {
      const category = Category.create({
        name: 'Movie',
        is_active: false,
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBeFalsy();
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSPy).toBeCalledWith(category);
      expect(validateSPy).toHaveBeenCalledTimes(1);
    });
  });

  describe('caterory_id', () => {
    const arrange = [
      {
        category_id: null,
      },
      {
        category_id: undefined,
      },
      {
        category_id: new Uuid(),
      },
    ];

    test.each(arrange)('id = %j', ({ category_id }) => {
      const category = new Category({
        name: 'Movie',
        category_id: category_id as any,
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      if (category_id instanceof Uuid) {
        expect(category.category_id).toBe(category_id);
      }
    });
  });
  describe('Change name', () => {
    test('should change the name', () => {
      const category = Category.create({
        name: 'Movie',
      });

      category.changeName('Books');

      expect(category.name).toBe('Books');
      expect(validateSPy).toBeCalledWith(category);
      expect(validateSPy).toHaveBeenCalledTimes(2);
    });
  });

  describe('Change description', () => {
    test('should change the description', () => {
      const category = Category.create({
        name: 'Movie',
      });

      category.changeDescription('Movies category');

      expect(category.description).toBe('Movies category');
      expect(validateSPy).toBeCalledWith(category);
      expect(validateSPy).toHaveBeenCalledTimes(2);
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

describe('Category Validator', () => {
  describe('create command', () => {
    test('should throw an error when name is empty', () => {
      expect(() => {
        Category.create({
          name: '',
        });
      }).toThrow();
    });
  });
});
