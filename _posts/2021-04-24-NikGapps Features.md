---
layout: post
title: "All the features NikGapps offers"
categories: misc
author: Nikhil Menghani
---

* This will become a table of contents (this text will be scrapped).
{:toc}

# NikGapps Features

NikGapps is a custom gapps project focused on providing google apps packages. 
Built from scratch, this project focuses on addressing underlying issues that most of the users experience with a gapps package. 
Open to listening, understanding and implementing, NikGapps focuses on solving all the reported problems.  

## Wide range of variants

Some people like to googlify their device, Some like to install the bare minimum apps required to run playstore.  
NikGapps comes various variants covering all your needs. The variants are as follows
- Core (Minimalistic, has only apps required to run playstore)
- Basic
- Omni
- Stock
- Full (All the apps that we use in our daily usage)

## Full control over your installation

One of the biggest challenge that we experience is to find a combination of google apps which suits everyone's need.  
Starting with users feedback, we came up with 5 NikGapps variants (core, basic, omni, stock, full) to define a set of google apps everyone would be satisfied with.  
With time, we realized, users are still spending installing apps than they don't need.
Many did not use Google Dialer (over stock aosp dialer) and Many specifically used Google Dialer

To overcome this problem, we came up with nikgapps.config. A config file that allows you to have full control over your installation.
NikGapps.config basically allows you to skip any app that you don't want to install, it also allows you to keep both aosp counterpart of google app if you want.  
So if you want to keep both Google Dialer and AOSP dialer, you can do so.  
If you want to skip any one of them, no problem, just configure your nikgapps.config file. 

We not only provide full control over installing your apps, we also allow you to control your addon.d execution, wipe dalvik cache after installation, basically anything that you would like to change in your gapps installation, we cover it.   
Head over to [nikgapps.config documentation](https://nikgapps.com/misc/2020/11/22/NikGapps-Config.html) to know more about how you can achieve that.

## Create your own NikGapps build

Full control over your installation wasn't enough, Users were still downloading apps they never wanted to flash.  
Being almost impossible to suit everyone's needs, we came up with a solution to create your own NikGapps build which will have exactly the apps that you use in your daily use.

If you don't want Google Dialer at all, no problem! You can create a build which will not have GoogleDialer in it.   
If you don't have knowledge to create a build or any server or resource to build it, don't worry, we've got you covered.

All you need to do is upload your custom nikgapps.config to [our config repository](https://github.com/nikgapps/config) and our nightly cycle will create a build for you.

## Different Addon.d implementation

We all know backuptools aka Addon.d scripts are created to backup all your system files that you want to preserve after an OTA update.  
Gapps installation is one of the modification that you want to preserve after an OTA update or dirty flashing a Rom so that you have a seamless experience and won't have to spend time after installing gapps again and again.  

While this is very convenient, we often find a few google apps that we either don't use or find them consuming a lot of battery.   
If we let those google apps survive over the OTA update, they are again going to be either useless or battery drainer.

To overcome this problem, NikGapps has a different way of addon.d implementation. We create addon.d script for each google app individually. Meaning, if you find that Stock Google Play Games is draining a lot of battery and you never use it, you can simply follow below steps to get rid of it  

- Find `50-GooglePlayGames.sh` file in /system/addon.d folder and delete it
- Reflash your Rom and Profit!

While we allow controlling backup and restore of every google app, we also let you control addon.d execution where you can decide whether you want to backup and restore your gapps, whether you wish to mount/unmount partitions during your addon.d execution

Head over to [nikgapps.config documentation](https://nikgapps.com/misc/2020/11/22/NikGapps-Config.html) to know more about how you can achieve that.

## Ability to uninstall selectively as well as completely 

Often a particular version of google app starts causing issues after installing and users starts to find ways to get rid of it.  
Many times they mess up and eventually reflash the whole Rom and gapps skipping the problematic app.

If you find yourself in such case, don't worry, we've got you covered. All you need to do is follow below steps

### Uninstall selected packages
**First Method (when you don't want your aosp counterpart back)**

- Set `<Package>=-1` in nikgapps.config (for e.g. `YouTube=-1`)
- Reflash the zip that you flashed to get the package in first place

**Second Method (when you want your aosp counterpart back)**

- Find `50-<Package>.sh` file in /system/addon.d folder and delete it (for e.g. `50-YouTube.sh`)
- Reflash your Rom

### Uninstall NikGapps completely

This will remove all the traces of NikGapps from your system

- set execute.d=0 in nikgapps.config
- reflash your Rom

## Release only when it makes a difference

When there are no changes made to the installer scipt, when there are no playstore updates to the google apps, would you prefer a nightly package with an updated date? We know We wouldn't. 

What if we made some important fixes to the installer script, would you prefer waiting for the update until next weekly or monthly cycle? We know we wouldn't.

So coming out of the nightly, weekly or montly cycle, we release the NikGapps builds only when there are changes involved. NikGapps deployment cycle smartly scans for the changes everyday to only release the builds when there are significant changes involved. 

So when you see a new Release, grabbing it would be worth it!

## Canary Releases

With new features being added to the project, we didn't want the stable release to be compromised at any cost with features that are untested. Thus, we introduced new release channel i.e. Canary Releases. 

#### What is Canary?

As with other kind of software releases, basically canary is technically a test, alpha, beta, whatever you call it. Has some improvements with quick fixes for previous issues. Main releases are more stable though it would be releases at a later date than canary. If you want to have a more stable update go for release, if you want bleeding edge, bugs be damned, go canary!


## Open Source

We're very happy to make NikGapps open source. This gives everyone the opportunity to contribute in all manners.

1. [Source code to build NikGapps](https://github.com/nikgapps/build)
2. [Config Repository to build your own gapps](https://github.com/nikgapps/config)
3. [Apk files for Android 10 builds](https://gitlab.com/nikgapps/10)
4. [Apk files for Android 11 builds](https://gitlab.com/nikgapps/11)
5. [NikGapps blogs](https://github.com/nikgapps/nikgapps.github.io/tree/master/_posts)

## Solid logging mechanism

We always ensure to best of our ability that NikGapps works for as many devices as possible. However, things are bound to fail in scenarios we can never predict. 
To troubleshoot the issues reported by users, we built a solid logging mechanism where we capture everything that we need in single Log file (with extension tar.gz) generated in /sdcard/NikGapps/logs folder

So next time you run into issues, make sure you grab the log file and share it with us so we can help troubleshoot the problems you are facing.

## Priv-App whitelist support

System apps being part of the system also requires certain permissions to be able to actually use the exclusive features. NikGapps supports priv-app whitelist feature (more on that [here](https://source.android.com/devices/tech/config/perms-allowlist)) that provides necessary permissions to privileged apps (which are system app with priviliges to access internal apis). This is automated so you never lose out on any feature that new google app updates offers.

<!-- 
### Safe and Secure
-->
