---
layout: post
title: "Rules for config files to get merged into NikGapps config repository"
categories: misc
author: Nikhil Menghani
---

* This will become a table of contents (this text will be scrapped).
{:toc}

# Rules for setting up your custom config file

For the better understanding of how NikGapps config release works, we've decided to document all the rules that you need to follow while configuring your config file. We understand that sending a pull request and not having to merge easily can be frustrating.  
This will help you get your config files merged quicker than before.

### Folder Structure
- 10  
  - A folder that targets Android Q
  - All the config file added into this folder will be used to created android 10 based builds
- 11
  - A folder that targets Android R
  - All the config file added into this folder will be used to created android 11 based builds
- archive
  - A folder that contains all the processed config files
  - Once the config file is used to build your custom gapps package, it is moved to this (archive) folder and it gets renamed to name_date.config file indicating the date it was moved
  - date indicated in the config name will help you find your build in [Config-Releases](https://sourceforge.net/projects/nikgapps/files/Config-Releases/) folder 

<p class="ui negative message">Any config file that is outside of above folders, it will be ignored by the NikGapps config build and moved to archive folder</p>

![Config_Repo_Folders.png](https://raw.githubusercontent.com/nikgapps/nikgapps.github.io/master/images/Config_Repo_Folders.png)

### Config rules

- The config build ignores the lines that are `blank` or starts with `#`. Make sure you don't comment out any config value 
- The `Core` AppSet is mandatory if you need Play Store
- When you set the `AppSet=0` for e.g. `Core=0`, the config build ignores all the packages that are part of Core
- You must know the packages that go together. for e.g. when you set `SetupWizard=1`, you must set `>>SetupWizard=1` and `>>GoogleRestore=1`, if one of them is set to 0, you will experience crashes
- When you set `Pixelize=1`, make sure you set `SetupWizard=1` too, Pixelize enables pixel animations in setup wizard and it's incomplete if `SetupWizard=0`
- GoogleChrome comes with 3 packages, all of them are mandatory. Make sure you know what you're doing if you set any one of the packages=0
- Config build only scans for the config values 1, if the config reads `GoogleChrome=2`, GoogleChrome will be ignored

![Config_Sample.png](https://raw.githubusercontent.com/nikgapps/nikgapps.github.io/master/images/Config_Sample.png)
