<?php
declare(strict_types=1);
require_once __DIR__ . '/../src/bootstrap.php';
require_admin();

$pdo = db();
$id = (int)($_GET['id'] ?? 0);
$article = [
    'id' => 0, 'title' => '', 'slug' => '', 'excerpt' => '', 'content_html' => '',
    'meta_title' => '', 'meta_description' => '', 'cover_image_url' => '', 'status' => 'draft',
];

if ($id > 0) {
    $st = $pdo->prepare('SELECT * FROM articles WHERE id=:id LIMIT 1');
    $st->execute(['id' => $id]);
    $found = $st->fetch();
    if ($found) {
        $article = $found;
    }
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = trim((string)($_POST['title'] ?? ''));
    $excerpt = trim((string)($_POST['excerpt'] ?? ''));
    $cover = trim((string)($_POST['cover_image_url'] ?? ''));
    $metaTitle = trim((string)($_POST['meta_title'] ?? ''));
    $metaDesc = trim((string)($_POST['meta_description'] ?? ''));
    $status = ($_POST['status'] ?? 'draft') === 'published' ? 'published' : 'draft';
    $contentHtml = sanitize_article_html((string)($_POST['content_html'] ?? ''));
    $contentText = extract_text($contentHtml);
    $slugInput = trim((string)($_POST['slug'] ?? ''));
    $baseSlug = slugify($slugInput !== '' ? $slugInput : $title);

    if ($title === '' || mb_strlen($title) < 5) {
        $error = 'Заголовок слишком короткий';
    } elseif ($contentHtml === '') {
        $error = 'Контент пустой';
    } else {
        $slug = unique_slug($baseSlug, $id > 0 ? $id : null);
        $data = [
            'slug' => $slug,
            'title' => $title,
            'excerpt' => $excerpt,
            'content_html' => $contentHtml,
            'content_text' => $contentText,
            'cover_image_url' => $cover !== '' ? $cover : null,
            'meta_title' => $metaTitle !== '' ? $metaTitle : null,
            'meta_description' => $metaDesc !== '' ? $metaDesc : null,
            'status' => $status,
            'author_login' => (string)$_SESSION['admin_user'],
            'published_at' => $status === 'published' ? date('Y-m-d H:i:s') : null,
        ];
        if ($id > 0) {
            $q = "UPDATE articles SET slug=:slug,title=:title,excerpt=:excerpt,content_html=:content_html,content_text=:content_text,cover_image_url=:cover_image_url,meta_title=:meta_title,meta_description=:meta_description,status=:status,author_login=:author_login, published_at = CASE WHEN status='draft' AND :status='published' THEN :published_at ELSE published_at END WHERE id=:id";
            $st = $pdo->prepare($q);
            $data['id'] = $id;
            $st->execute($data);
        } else {
            $q = "INSERT INTO articles (slug,title,excerpt,content_html,content_text,cover_image_url,meta_title,meta_description,status,published_at,author_login) VALUES (:slug,:title,:excerpt,:content_html,:content_text,:cover_image_url,:meta_title,:meta_description,:status,:published_at,:author_login)";
            $st = $pdo->prepare($q);
            $st->execute($data);
            $id = (int)$pdo->lastInsertId();
        }
        header('Location: /admin/article-edit.php?id=' . $id . '&saved=1');
        exit;
    }
}
?>
<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= $id > 0 ? 'Редактирование статьи' : 'Новая статья' ?></title>
  <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
  <style>
    body{margin:0;font-family:Inter,system-ui,sans-serif;background:#f8fafc;color:#0f172a}
    .wrap{max-width:1100px;margin:0 auto;padding:24px 16px}
    .grid{display:grid;grid-template-columns:1fr 320px;gap:14px}
    @media(max-width:980px){.grid{grid-template-columns:1fr}}
    input,textarea,select{width:100%;box-sizing:border-box;padding:10px;border-radius:10px;border:1px solid #cbd5e1}
    .card{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:14px}
    #editor{height:360px;background:#fff}
    .btn{border:0;border-radius:10px;padding:10px 14px;cursor:pointer;font-weight:700}
    .ok{background:#16a34a;color:#fff} .muted{background:#334155;color:#fff}
  </style>
</head>
<body>
  <div class="wrap">
    <p><a href="/admin/articles.php">← К списку статей</a></p>
    <?php if (!empty($_GET['saved'])): ?><p style="color:#15803d">Сохранено</p><?php endif; ?>
    <?php if ($error !== ''): ?><p style="color:#dc2626"><?= e($error) ?></p><?php endif; ?>

    <form method="post" class="grid" id="form">
      <div class="card">
        <label>Заголовок</label>
        <input name="title" value="<?= e((string)$article['title']) ?>" required>
        <label style="margin-top:10px;display:block">Краткое описание</label>
        <textarea name="excerpt" rows="3"><?= e((string)$article['excerpt']) ?></textarea>
        <label style="margin-top:10px;display:block">Контент</label>
        <div id="editor"><?= (string)$article['content_html'] ?></div>
        <input type="hidden" name="content_html" id="content_html">
      </div>

      <div class="card">
        <label>Slug (опционально)</label>
        <input name="slug" value="<?= e((string)$article['slug']) ?>" placeholder="auto-from-title">
        <label style="margin-top:10px;display:block">Meta title</label>
        <input name="meta_title" value="<?= e((string)$article['meta_title']) ?>">
        <label style="margin-top:10px;display:block">Meta description</label>
        <textarea name="meta_description" rows="3"><?= e((string)$article['meta_description']) ?></textarea>
        <label style="margin-top:10px;display:block">Обложка URL</label>
        <input name="cover_image_url" value="<?= e((string)$article['cover_image_url']) ?>">
        <label style="margin-top:10px;display:block">Статус</label>
        <select name="status">
          <option value="draft" <?= (string)$article['status'] === 'draft' ? 'selected' : '' ?>>Черновик</option>
          <option value="published" <?= (string)$article['status'] === 'published' ? 'selected' : '' ?>>Опубликовано</option>
        </select>
        <div style="display:flex;gap:8px;margin-top:12px">
          <button class="btn ok" type="submit">Сохранить</button>
          <a class="btn muted" style="text-decoration:none" href="/admin/articles.php">Отмена</a>
        </div>
      </div>
    </form>
  </div>
  <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
  <script>
    const quill = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ header: [2, 3, false] }],
          ['bold', 'italic', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image', 'clean']
        ]
      },
      placeholder: 'Напишите полезную статью...'
    });
    const form = document.getElementById('form');
    form.addEventListener('submit', function () {
      document.getElementById('content_html').value = quill.root.innerHTML;
    });
  </script>
</body>
</html>
