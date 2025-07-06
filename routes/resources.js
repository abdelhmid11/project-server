import express from 'express';

const router = express.Router();

// Get all resources
router.get('/', async (req, res) => {
  try {
    const { category, type, difficulty, search } = req.query;
    let resources = req.app.locals.resources;

    // Build query based on filters
    if (category) {
      resources = resources.filter(r => r.category === category);
    }
    if (type) {
      resources = resources.filter(r => r.type === type);
    }
    if (difficulty) {
      resources = resources.filter(r => r.difficulty === difficulty);
    }
    if (search) {
      const searchLower = search.toLowerCase();
      resources = resources.filter(r => 
        r.title.toLowerCase().includes(searchLower) ||
        r.description.toLowerCase().includes(searchLower) ||
        r.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Sort by featured first, then by creation date
    resources.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    res.json(resources);
  } catch (error) {
    console.error('Resources fetch error:', error);
    res.status(500).json({ message: 'خطأ في جلب المصادر' });
  }
});

// Get featured resources
router.get('/featured', async (req, res) => {
  try {
    const resources = req.app.locals.resources;
    const featuredResources = resources.filter(r => r.featured).slice(0, 6);
    res.json(featuredResources);
  } catch (error) {
    console.error('Featured resources error:', error);
    res.status(500).json({ message: 'خطأ في جلب المصادر المميزة' });
  }
});

// Initialize sample resources
router.post('/init', async (req, res) => {
  try {
    const resources = req.app.locals.resources;
    
    if (resources.length > 0) {
      return res.json({ message: 'المصادر موجودة بالفعل' });
    }

    const sampleResources = [
      {
        _id: '1',
        title: 'دورة تعلم HTML و CSS كاملة',
        description: 'دورة شاملة لتعلم أساسيات تطوير المواقع باللغة العربية',
        url: 'https://www.youtube.com/watch?v=example1',
        type: 'course',
        category: 'frontend',
        difficulty: 'beginner',
        tags: ['HTML', 'CSS', 'تطوير مواقع'],
        author: 'أكاديمية حسوب',
        rating: 5,
        isFree: true,
        featured: true,
        createdAt: new Date()
      },
      {
        _id: '2',
        title: 'تعلم JavaScript من الصفر',
        description: 'تعلم لغة البرمجة الأساسية لتطوير المواقع التفاعلية',
        url: 'https://www.youtube.com/watch?v=example2',
        type: 'course',
        category: 'frontend',
        difficulty: 'beginner',
        tags: ['JavaScript', 'البرمجة', 'المتغيرات'],
        author: 'عبد الله عيد',
        rating: 5,
        isFree: true,
        featured: true,
        createdAt: new Date()
      },
      {
        _id: '3',
        title: 'دورة React.js كاملة',
        description: 'تعلم مكتبة React لبناء تطبيقات الويب الحديثة',
        url: 'https://www.youtube.com/watch?v=example3',
        type: 'course',
        category: 'frontend',
        difficulty: 'intermediate',
        tags: ['React', 'JavaScript', 'مكتبات'],
        author: 'كودزيلا',
        rating: 5,
        isFree: true,
        featured: true,
        createdAt: new Date()
      },
      {
        _id: '4',
        title: 'تعلم Node.js للمبتدئين',
        description: 'دورة شاملة لتعلم تطوير الخوادم باستخدام Node.js',
        url: 'https://www.youtube.com/watch?v=example4',
        type: 'course',
        category: 'backend',
        difficulty: 'intermediate',
        tags: ['Node.js', 'Backend', 'خوادم'],
        author: 'محمد عيسى',
        rating: 5,
        isFree: true,
        featured: true,
        createdAt: new Date()
      },
      {
        _id: '5',
        title: 'كتاب تعلم البرمجة للمبتدئين',
        description: 'كتاب مجاني يشرح أساسيات البرمجة بطريقة مبسطة',
        url: 'https://example.com/book1',
        type: 'book',
        category: 'general',
        difficulty: 'beginner',
        tags: ['أساسيات', 'مبتدئين', 'مفاهيم'],
        author: 'دار النشر التقني',
        rating: 4,
        isFree: true,
        featured: false,
        createdAt: new Date()
      },
      {
        _id: '6',
        title: 'موقع MDN Web Docs بالعربية',
        description: 'مرجع شامل لتقنيات الويب مع ترجمة عربية',
        url: 'https://developer.mozilla.org/ar/',
        type: 'website',
        category: 'frontend',
        difficulty: 'beginner',
        tags: ['مرجع', 'توثيق', 'ويب'],
        author: 'Mozilla',
        rating: 5,
        isFree: true,
        featured: false,
        createdAt: new Date()
      }
    ];

    resources.push(...sampleResources);
    res.json({ message: 'تم إضافة المصادر بنجاح' });
  } catch (error) {
    console.error('Init resources error:', error);
    res.status(500).json({ message: 'خطأ في إضافة المصادر' });
  }
});

export default router;