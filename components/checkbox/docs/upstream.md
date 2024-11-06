# Maintaining your fork's upstream relationship

So you forked this repo. That's awesome. But don't forget you keep your `master` branch in sync with the upstream `master` branch to ensure that your pull requests will always be able to be merged.

## How to sync with upstream?

With a locally cloned repository, you can do this with git with your CLI as follows.

#### Add upstream

First you want to verify your current remote config settings.

```bash
$ git remote -v
```

This should return

```bash
origin  https://github.com/[yourUserName]/auro-checkbox.git (fetch)
origin  https://github.com/[yourUserName]/auro-checkbox.git (push)
```

To add the upstream repo to your local forked project

```bash
$ git remote add upstream https://github.com/AlaskaAirlines/auro-checkbox.git
```

To validate this worked, run the following again

```bash
$ git remote -v
```

```
origin  https://github.com/[yourUserName]/auro-checkbox.git (fetch)
origin  https://github.com/[yourUserName]/auro-checkbox.git (push)
upstream        https://github.com/AlaskaAirlines/auro-checkbox.git (fetch)
upstream        https://github.com/AlaskaAirlines/auro-checkbox.git (push)
```

#### Sync upstream

To sync your `master` branch with the upstream `master` branch, there are two ways you can do this. The preferred method is to fetch and rebase. Please do not merge down.

```bash
$ git checkout master

$ git fetch upstream
$ git rebase upstream/master
```

Then to sync your feature brach,

```bash
$ git checkout feature-branch
$ git rebase master
```

#### Brute force

In the case where your `master` branch's history is not in sync with the upstream, then you have few options. The nuclear option is to trash the fork and re-fork, but there is an easier way. the following step will force reset your `master` branch with that of the upstream `master` branch.

```bash
$ git reset --hard upstream/master
```

Just to make sure that all things are synced correctly, run the following:

```bash
$ git checkout master

$ git fetch upstream
$ git merge upstream/master
```

## Maintain upstream

Once you have connected your local forked clone to the upstream repo, maintenance is the key. It is important to ensure that your `master` branch is always updated BEFORE you create a new branch intended to be used with a new pull request. This will help to eliminate any potential issues with merging when the `master` branches are out of sync.
