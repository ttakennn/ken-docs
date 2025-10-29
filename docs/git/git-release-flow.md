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

:sparkles: Duy trì luồng code 3 môi trường (`stg`, `uat`, `prod`) ổn định,  
:sparkles: cho phép cherry-pick chọn lọc, tránh conflict khi merge về sau.

:::

---

## 🧱 1. Cấu trúc nhánh

| Môi trường           | Nhánh  | Vai trò                        |
| -------------------- | ------ | ------------------------------ |
| Staging              | `stg`  | Nhánh phát triển & test nội bộ |
| User Acceptance Test | `uat`  | Test người dùng, QA            |
| Production           | `prod` | Deploy chính thức              |

---

## 🔁 2. Nguyên tắc chung

- **stg → uat → prod** là luồng chính.
- Mỗi môi trường chỉ cherry-pick **từ nhánh liền kề phía trước.**
- Không cherry-pick “nhảy cấp” (ví dụ từ `stg` lên `prod` trực tiếp).
- Sau mỗi đợt cherry-pick, **đánh dấu merge giả** bằng `-s ours` để tránh conflict về sau.

---

## 🧩 3. Cherry-pick workflow

### 💡 Mục tiêu

Lấy commit chọn lọc từ nhánh trước (source) sang nhánh sau (target).

---

### 🔹 3.1. Từ `stg` → `uat`

**Bước 1.** Kiểm tra commit trên `stg`:

```bash
git checkout stg
git log --oneline
```

**Bước 2.** Ghi lại commit cần cherry-pick (ví dụ: `abc123`, `def456`).

**Bước 3.** Cherry-pick sang `uat`:

```bash
git checkout uat
git pull origin uat
git cherry-pick abc123 def456
# Nếu có conflict:
# git add .
# git cherry-pick --continue
git push origin uat
```

**Bước 4.** Đánh dấu merge giả để Git ghi nhớ:

```bash
git merge -s ours origin/stg
git push origin uat
```

---

### 🔹 3.2. Từ `uat` → `prod`

**Bước 1.** Xác định commit từ `uat` cần đưa lên `prod`:

```bash
git checkout uat
git log --oneline
```

**Bước 2.** Cherry-pick sang `prod`:

```bash
git checkout prod
git pull origin prod
git cherry-pick <commit-id-from-uat>
git push origin prod
```

**Bước 3.** Đánh dấu merge giả để tránh conflict về sau:

```bash
git merge -s ours origin/uat
git push origin prod
```

---

## 🧠 4. Giải thích `-s ours`

- `git merge -s ours <branch>` giúp **Git ghi nhớ rằng nhánh hiện tại đã merge nhánh kia**,  
  nhưng **giữ nguyên toàn bộ code của nhánh hiện tại**.
- Khi sau này merge thật (`stg → uat` hoặc `uat → prod`), Git sẽ **không conflict** vì thấy “đã merge trước đó”.

---

## 🧰 5. Rollback / Revert Merge Commit

### Nếu merge commit chưa push:

```bash
git reset --hard HEAD~1
```

### Nếu merge commit đã push:

```bash
git revert -m 1 <merge_commit_id>
git push origin <branch>
```

---

## 📋 6. Kiểm tra lịch sử commit của 1 file

| Mục tiêu                      | Lệnh                       |
| ----------------------------- | -------------------------- |
| Xem commit nào ảnh hưởng file | `git log --oneline <file>` |
| Xem chi tiết thay đổi         | `git log -p <file>`        |
| Xem ai sửa dòng nào           | `git blame <file>`         |

---

## 🚦 7. Checklist trước khi push

| Bước | Hành động                                      | Ghi chú                                   |
| ---- | ---------------------------------------------- | ----------------------------------------- |
| 1    | Đảm bảo đang đúng nhánh (`stg`, `uat`, `prod`) | `git branch`                              |
| 2    | Pull mới nhất từ remote                        | `git pull origin <branch>`                |
| 3    | Cherry-pick commit cần thiết                   | `git cherry-pick <commit-id>`             |
| 4    | Resolve conflict nếu có                        | `git add . && git cherry-pick --continue` |
| 5    | Push lên remote                                | `git push origin <branch>`                |
| 6    | Merge -s ours để tránh conflict                | `git merge -s ours origin/<source>`       |

---

## 📦 8. Ví dụ thực tế

Giả sử `stg` có 10 commits mới, bạn chỉ muốn lấy commit thứ 3 và 4 lên UAT:

```bash
# Từ STG → UAT
git checkout stg
git log --oneline  # ghi lại commitId: a1b2c3, b2c3d4

git checkout uat
git pull origin uat
git cherry-pick a1b2c3 b2c3d4
git push origin uat

# Đánh dấu merge giả
git merge -s ours origin/stg
git push origin uat
```

Sau khi UAT test xong, muốn đưa lên PROD:

```bash
git checkout prod
git pull origin prod
git cherry-pick a1b2c3 b2c3d4  # hoặc lấy commitId tương ứng từ UAT
git push origin prod

git merge -s ours origin/uat
git push origin prod
```

---

## 🧭 9. Quy tắc tổng quát cherry-pick theo môi trường

| Nguồn           | Đích      | Cherry-pick từ đâu          | Ghi chú |
| --------------- | --------- | --------------------------- | ------- |
| STG → UAT       | `stg`     | Lấy commit từ `stg`         |
| UAT → PROD      | `uat`     | Lấy commit từ `uat`         |
| Sau cherry-pick | `-s ours` | Merge giả để tránh conflict |

---

## 📚 10. Tips hữu ích

- Luôn **pull mới nhất** trước khi cherry-pick.
- Khi cherry-pick nhiều commit liên tiếp:
  ```bash
  git cherry-pick A..B  # từ commit A đến B
  ```
- Dùng `git log --graph --oneline --decorate` để xem luồng branch trực quan.
- Dùng extension **GitLens** trong VSCode để xem lịch sử dễ hơn.

---
