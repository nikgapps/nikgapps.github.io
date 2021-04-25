---
layout: post
title: "All the features NikGapps offers"
categories: misc
author: Nikhil Menghani
---

# NikGapps Features

NikGapps is a custom gapps project focused on providing google apps packages. 
Built from scratch, this project focuses on addressing underlying issues that most of the users experience with a gapps package. 
Open to listening, understanding and implementing, NikGapps focuses on solving all the reported problems.  

### Wide range of variants

Some people like to googlify their device, Some like to install the bare minimum apps required to run playstore.  
NikGapps comes various variants covering all your needs. The variants are as follows
- Core (Minimalistic, has only apps required to run playstore)
- Basic
- Omni
- Stock
- Full (All the apps that we use in our daily usage)

### Full control over your installation

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

### Create your own NikGapps build

Full control over your installation wasn't enough, Users were still downloading apps they never wanted to flash.  
Being almost impossible to suit everyone's needs, we came up with a solution to create your own NikGapps build which will have exactly the apps that you use in your daily use.

If you don't want Google Dialer at all, no problem! You can create a build which will not have GoogleDialer in it.   
If you don't have knowledge to create a build or any server or resource to build it, don't worry, we've got you covered.

All you need to do is upload your custom nikgapps.config to [our config repository](https://github.com/nikgapps/config) and our nightly cycle will create a build for you.

### Different Addon.d implementation

We all know backuptools aka Addon.d scripts are created to backup all your system files that you want to preserve after an OTA update.  
Gapps installation is one of the modification that you want to preserve after an OTA update or dirty flashing a Rom so that you have a seamless experience and won't have to spend time after installing gapps again and again.  

While this is very convenient, we often find a few google apps that we either don't use or find them consuming a lot of battery.   
If we let those google apps survive over the OTA update, they are again going to be either useless or battery drainer.

To overcome this problem, NikGapps has a different way of addon.d implementation. We create addon.d script for each google app individually. Meaning, if you find that Stock Google Play Games is draining a lot of battery and you never use it, you can simply follow below steps to get rid of it  

- Find `GooglePlayGames.sh` file in /system/addon.d/nikgapps folder and delete it
- Reflash your Rom and Profit!

While we allow controlling backup and restore of every google app, we also let you control addon.d execution where you can decide whether you want to backup and restore your gapps, whether you wish to mount/unmount partitions during your addon.d execution

Head over to [nikgapps.config documentation](https://nikgapps.com/misc/2020/11/22/NikGapps-Config.html) to know more about how you can achieve that.

### Ability to uninstall selectively as well as completely 

Often a particular version of google app starts causing issues after installing and users starts to find ways to get rid of it.  
Many times they mess up and eventually reflash the whole Rom and gapps skipping the problematic app.

If you find yourself in such case, don't worry, we've got you covered. All you need to do is follow below steps

#### Uninstall selected packages
First Method (when you don't want your aosp counterpart back)

- Set `<Package>=-1` in nikgapps.config (for e.g. `YouTube=-1`)
- Reflash the zip that you flashed to get the package in first place

Second Method (when you want your aosp counterpart back)

- Find `<Package>>.sh` file in /system/addon.d/nikgapps folder and delete it (for e.g. `YouTube.sh`)
- Reflash your Rom

#### Uninstall NikGapps completely

This will remove all the traces of NikGapps from your system

- set execute.d=0 in nikgapps.config
- reflash your Rom

<!-- 
### Safe and Secure
### Release only when it makes a difference
### Canary Releases
### Solid logging mechanism
### Open Source
-->
