---
description: Useful commands in GIT
id: git-useful-commands
title: Git Useful Commands
slug: /git/git-useful-commands
sidebar_position: 2
tags: [Git]
---

# Useful commands in GIT

:sparkles: The commands will help you use Git more easily in your project.

## Reset all commits

```bash
git reset --hard origin/develop
```

## Rename message

```bash title='Rename 1st commit in log'
git commit --amend --m "new message"
git push --force
```

```bash title='Rename previous commits'
git log
git rebase -i HEAD~n
replace the word "pick" with "reword" next to that commit.
git push –force
```

**n**: the line number which you need edit

## Change commit code after pushed

:memo: This command will replace your commit in remote repository.

```bash title='Rename 1st commit in log'
change your code
git add files changed
git commit --amend –-no-edit
git push --force
```

```bash title='Rename previous commits'
git log
git rebase -i HEAD~n
change your code
git add files changed
git commit –-amend –-no-edit
git rebase --continue
git push –force
```

**n**: the line number which you need edit

## Git ignore file in local

```bash title="skip file"
git update-index --skip-worktree FILENAME
```

```bash title="no-skip file"
git update-index --no-skip-worktree FILENAME
```

## Delete all branches in local

```bash
git branch | grep -v "develop" | grep -v "master" | grep -v "main" | grep -v "sg/deploy/uat" | grep -v "tw/deploy/uat" | grep -v   "my/deploy/uat" | xargs git branch -D
```

## Get List Commits ID from Merge Request

<details>
  <summary>Click to View</summary>
  <div>
    ```bash
    // Function to scroll the page to the bottom 
    function scrollToBottom() { 
      window.scrollTo(0, document.body.scrollHeight); 
    }

    // Function to check if the page has reached the bottom
    function isPageBottom() {
      return window.innerHeight + window.pageYOffset >= document.body.scrollHeight;
    }

    function scrollAndExecute() {

      if (isPageBottom()) {
      // Get all elements with the class "commit flex-row js-toggle-container"
      const commitElements = document.getElementsByClassName('commit flex-row js-toggle-container');
        // Create an array to store the results
        const results = [];

        // Iterate over each commit element
        for (let i = 0; i < commitElements.length; i++) {
          const commitElement = commitElements[i];

          // Find the element with the class "label label-monospace monospace" within the commit element
          const labelElement = commitElement.querySelector('.label.label-monospace.monospace');

          // Find the commit message element within the commit element
          const commitMessageElement = commitElement.querySelector('.commit-row-message.item-title.js-onboarding-commit-item');

          // Check if the commit message contains "Merge branch"
          if (labelElement && commitMessageElement && !commitMessageElement.innerHTML.includes('Merge branch')) {

            // Retrieve the innerHTML value and add it to the results array
            results.push(labelElement.innerHTML.trim());
          }
        }

        // Reverse the results array and join its elements with a space
        const reversedString = `git cherry-pick ${results.reverse().join(' ')}`;

        // Create a temporary textarea element to save the reversed string to clipboard
        const tempTextarea = document.createElement('textarea');
        tempTextarea.value = reversedString;

        // Append the textarea to the document body
        document.body.appendChild(tempTextarea);

        // Select the textarea's contents
        tempTextarea.select();

        // Copy the selected text to the clipboard
        document.execCommand('copy');

        // Remove the temporary textarea from the document body
        document.body.removeChild(tempTextarea);
      } else {
          scrollToBottom();
          setTimeout(scrollAndExecute, 1000); // Adjust the delay (in milliseconds) if needed
        }
      }
    // Start scrolling and executing the code
    scrollAndExecute();
    ```

  </div>
</details>

:::info How to use
You can paste this code into the console tab to retrieve all commits from an MR (Merge Request) or search for commits. The output will generate the following: `git cherry-pick 4ad7f88c bcfbc961 1cf652b6`, and it will be saved to the clipboard. You just need to `Ctrl+V` (paste) it into the command prompt.
:::

## My Task Code

<details>
  <summary>Click to View</summary>
  <div>
    <div>
    ```js
javascript:!function(){let baseURL = prompt('Please input option baseURL:\n1: https://penguin.stage-ap.apps.bsci.com/\n2: https://penguin-qa.demoapp.info/\nOther: http://localhost:8169/', '0');  let countryCode = '';  if (['1','2'].includes(baseURL)){  countryCode = prompt('Please enter countryCode (anz, sg, my, tw):', 'anz');    if (!countryCode) {      alert('Missing countryCode');      return;      }  }  let orderId = prompt('Please enter orderId', '');  let token = prompt('Please enter accessToken', '');  if (!baseURL || !orderId || !token) {    alert('Missing baseURL or orderId or accessToken');    return;    }  let url = 'http://localhost:8169/';  switch(baseURL){  case '1':    url = `https://penguin.stage-ap.apps.bsci.com/${countryCode}/`;    break;    case '2':    url = `https://penguin-qa.demoapp.info/${countryCode}/`;    break;    default:    break;  }  window.open(`${url}pages/webview/my-task/${orderId}?token=${token}`, %27_blank%27);}(); 
    ```
    </div>
  </div>
</details>
