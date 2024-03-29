const express = require('express');
const router = express.Router();
const ctrl = require('./news.ctrl');

router.get('/', ctrl.index);
router.get('/yh/rss/newest', ctrl.yhRssNewest)
router.get('/yh/rss/headline', ctrl.yhRssHeadline);
router.get('/naver/search', ctrl.naverSearch);
router.get('/naver/news-keywords', ctrl.naverNewsKeywords);

module.exports = router;