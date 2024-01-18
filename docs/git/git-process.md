---
description: Process in your project when using git
id: git-process
title: Git Process
slug: /git/git-process
sidebar_position: 1
tags: [Git]
---

# Git Process

:sparkles: Process in your project when using git. :fire:

## Create feature branch

:memo: **Create feature branch with format:** `TYPE/COUNTRY/<TICKET-ID>-<TITLE>`

- `TYPE`: bug | hotfix | task | feature | story | improvement | ...

- `COUNTRY`: sg | my | tw | anz | ...

  - This field is optional depending on your project

- `TICKET-ID`: ID ticket from JIRA, Open Project ...

  - JIRA ticket: `bsc-oit.atlassian.net/JIB-8378`
  - Open Project ticket: `openproject.com/projects/59587`

- `TITLE`: is the title of a ticket which you are processing

:diamond_shape_with_a_dot_inside: **Example**:

- Create branch for JIRA ticket: `feature/tw/jib-8378-inventory-status`
- Create branch for OpenProject ticket: `task/op-59587-tech-common-system-architecture`

## Commit Ticket

:memo: **Commit ticket with format:** `[TICKET-ID] - MESSAGE`

- `TICKET-ID`: ID ticket from JIRA, Open Project ...

  - JIRA ticket: `bsc-oit.atlassian.net/JIB-8378`
  - Open Project ticket: `openproject.com/projects/59587`

- `MESSAGE`: The name must be appropriate for the task at hand

:diamond_shape_with_a_dot_inside: **Example**:

- Commit ticket for JIRA: `[JIB-3521] - Integrate APIs to get list users`
- Commit ticket for OpenProject: `[OP-58212] - Creating layout for Home page`

## Title Merge Request

:memo: **Title MR with format:** `[COUNTRY-ENV]/[TICKET-ID]-TITLE`

- `COUNTRY`: SG | MY | TW | ANZ | ...

  - This field is optional depending on your project

- `ENV`: QA | UAT | SIT | PROD

- `TICKET-ID`: ID ticket from JIRA, Open Project ...

  - JIRA ticket: `bsc-oit.atlassian.net/JIB-8378`
  - Open Project ticket: `openproject.com/projects/59587`

- `TITLE`: is the title of a ticket which you are processing

:diamond_shape_with_a_dot_inside: **Example**:

- Title MR for JIRA ticket: `[SG-UAT][JIB-8378] - Inventory Status`
- Title MR for OpenProject ticket: `[OP-59587] - Tech Common System Architecture`
