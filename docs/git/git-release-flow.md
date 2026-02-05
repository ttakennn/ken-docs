---
description: Process release on environments
id: git-workflow
title: Git Workflow
slug: /git-workflow
sidebar_position: 1
tags: [Git]
keywords:
  - git, workflow
last_update:
  date: 10/29/2025
  author: Admin
---

# Git Workflow

:::info

**Release Flow (staging → uat → production)**

Tài liệu này mô tả quy trình chuẩn để promote code giữa 3 môi trường:

- **staging**: Dev/QA nội bộ  
- **uat**: User Acceptance Testing  
- **production**: Live environment  

:::

---

Mục tiêu:

✅ Promote đúng commit cần thiết  
✅ Không conflict về sau  
✅ Không dùng force-push trên protected branch  
✅ Tránh merge sai kiểu `-s ours` gây “mất code”  

---

## 1. Nguyên tắc quan trọng

### ❌ Không dùng `git merge -X theirs` để replace toàn bộ code
`-X theirs` chỉ chọn code của nhánh kia **khi có conflict**, không overwrite toàn bộ file.

### ❌ Không reset rồi force-push lên protected branch
Production thường bị GitLab chặn force-push.

### ✅ Muốn environment A giống 100% environment B
Phải dùng chiến thuật:

1. Merge commit ghi nhận lịch sử (`-s ours`)
2. Overwrite toàn bộ tree bằng `git checkout origin/<branch> -- .`
3. Commit + push bình thường

---

## 2. Promote một vài commit từ staging → uat

### Khi chỉ muốn lấy commit #3, #4 (không merge full)

```bash
git checkout uat
git pull origin uat

# lấy commit cụ thể
git cherry-pick <commit-id-3>
git cherry-pick <commit-id-4>

git push origin uat
```

📌 Sau này vẫn merge staging được bình thường vì history không bị phá.

---

## 3. Promote full staging → uat (đồng bộ hoàn toàn)

### Bước chuẩn (overwrite tree)

```bash
git fetch origin

# 1. Đồng bộ local uat với remote
git checkout uat
git reset --hard origin/uat

# 2. Ghi nhận merge staging → uat (tránh conflict sau này)
git merge -s ours origin/staging -m "Record merge: staging -> uat"

# 3. Overwrite toàn bộ source bằng staging
git checkout origin/staging -- .

# 4. Commit thay đổi
git add -A
git commit -m "Overwrite UAT with staging content"

# 5. Push bình thường
git push origin uat
```

---

## 4. Promote uat → production (protected branch)

### Production không được force-push, nên phải push commit bình thường

```bash
git fetch origin

# 1. Đồng bộ production với remote
git checkout production
git reset --hard origin/production

# 2. Record merge history (không đổi code)
git merge -s ours origin/uat -m "Record merge: uat -> production"

# 3. Overwrite toàn bộ source production bằng uat
git checkout origin/uat -- .

# 4. Commit overwrite
git add -A
git commit -m "Overwrite production with UAT content"

# 5. Push (không force)
git push origin production
```

✅ Không conflict  
✅ Không bị GitLab chặn  
✅ Production giống UAT 100%

---

## 5. Giữ lại file riêng của từng môi trường

Ví dụ: production có config riêng, README riêng…

### Overwrite tất cả nhưng restore file cần giữ

```bash
git checkout origin/uat -- .
git checkout origin/production -- README.md .env.production
```

Sau đó commit như bình thường.

---

## 6. Rollback nhanh nếu promote sai

### Rollback production về commit trước đó

```bash
git checkout production
git log --oneline

git revert <bad-commit-id>
git push origin production
```

Hoặc reset local để xem lại:

```bash
git reset --hard origin/production
```

---

## 7. Quy tắc team bắt buộc

- Không dùng `git merge -s ours` một mình (sẽ “merge mà không có code”)
- Không reset + force-push production
- Promote full env phải theo quy trình overwrite tree
- Luôn backup branch trước khi overwrite lớn:

```bash
git checkout -b production-backup origin/production
git push origin production-backup
```

---

## 8. Summary nhanh

| Task | Cách đúng |
|------|----------|
| Lấy vài commit | cherry-pick |
| Promote full env | merge -s ours + checkout overwrite + commit |
| Protected branch | push commit bình thường, không force |
| Giữ file riêng | restore file sau overwrite |

---

📌 Document owner: Admin  
📌 Last updated: 2026-02

