---
layout: post
title: "All about NikGapps.config"
categories: misc
author: Nikhil Menghani
---

* This will become a table of contents (this text will be scrapped).
{:toc}

# Introduction

Ever since the aroma installer started to be incompatible with newer versions of recovery, the convenience of customizing the installation has been almost impossible for the users. **nikgapps.config** offers a solution to the same problem so you can completely control the installation as per your needs. You can choose which package to install, which package to skip, which package to replace corresponding AOSP app with google app, which partition to install the gapps in. Keep reading if you're looking for a way to setup your own custom variant of google apps. 

# What nikgapps.config is and how it works

nikgapps.config is a configuration file which allows you to completely configure your installation. It also allows you to create custom gapps builds (more on that later)

Any NikGapps package that you flash reads a config file named `nikgapps.config` which is located inside `/sdcard/NikGapps` folder to perform the installation. To make it convenient for users, `nikgapps.config` can also be located at different locations, the location preference is listed below.  

## List of nikgapps.config location preferences

Following are the list of locations preferred in ascending order which means if the config file is present in two locations `/tmp/nikgapps.config` and `/sdcard1/nikgapps.config` the one from `/tmp` will be picked up.
1. "/tmp/nikgapps.config"
2. "$ZIPDIR/nikgapps.config" where ZIPDIR is the directory NikGapps package is located
3. "/sdcard1/nikgapps.config"
4. "/sdcard1/NikGapps/nikgapps.config"
5. "/sdcard/nikgapps.config"
6. "/sdcard/NikGapps/nikgapps.config"
7. "$ZIPFILE/afzc/nikgapps.config" where $ZIPFILE is the zip you are flashing

If the installer doesn't find **nikgapps.config**, it automatically creates the file for you so you can configure it the way you want.

## How to setup nikgapps.config for first time users

You can download nikgapps.config from <a target="_blank" href="https://sourceforge.net/projects/nikgapps/files/Releases/Config/nikgapps-config">here</a> and place it in `/sdcard/NikGapps` folder (you can create this folder manually) and then start configuring. Alternatively, you can also extract nikgapps.config from the gapps zip and place it in `/sdcard/NikGapps`. 

## Understanding nikgapps.config and using it to configure your installation

nikgapps.config is a LF based configuration file. By editing nikgapps.config, you can skip any Package that you don't want to be part of your installation.

nikgapps.config is built with list of AppSets, Packages and comments. 

All the lines starting with # are comments. All the lines starting with `>>` are Packages inside of AppSet above them.

for example, `SetupWizard` is an `AppSet` that contains set of Apps that are combined to define a Package. Skipping an AppSet skips all the packages that defines an AppSet. 

    SetupWizard=0
    >>SetupWizard=1
    >>GoogleRestore=1
    >>GoogleOneTimeInitializer=1

NikGapps installer skips the commented lines and reads the uncommented lines to performs the installation based on the config value.

NikGapps installer recognizes 4 config values for every package that it installs.

<table class="ui striped fixed small unstackable table">
  <thead>
    <tr>
      <th  class="six wide center aligned">Value</th>
      <th  class="ten wide">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="center aligned">-1</td>
      <td>Uninstall the package</td>
    </tr>
    <tr>
      <td class="center aligned">0</td>
      <td>Skip the package</td>
    </tr>
    <tr>
      <td class="center aligned">1</td>
      <td>Install the package and delete corresponding aosp app</td>
    </tr>
    <tr>
      <td class="center aligned">2</td>
      <td>Install the package and do not delete corresponding aosp app</td>
    </tr>
  </tbody>
</table>

In addition to controlling how individual package behaves, you can also control how the installer behaves. `nikgapps.config` allows you to control which partition you want to install your gapps in (handy when you're storage space for system or product partition is full), whether or not you want to wipe dalvik/cache during your installation and simply uninstall a package that you accidentally installed. 

First things first, let's find out how to skip installing a package or a set of apps also called `AppSet`.

### How to skip installing a Package/AppSet

For instance, if you want to skip installing `Google Contacts`, all you need to do is open nikgapps.config and find an entry of Google Contacts (usually the spaces are trimmed and the entry you will find will be GoogleContacts). In order to skip installing the package, the config should read `<Name>=0` ; where `<Name>` is package name. Which means, in our case `GoogleContacts=0`.

### How to remove AOSP counterpart of google app you're installing

If you want to install GoogleContacts and remove Aosp Contacts, config should read `GoogleContacts=1`. This is the default setting and unless you want to keep the aosp counterpart, you don't need to make any changes. Flash the gapps package after setting the config value.

### How to keep AOSP counterpart of google app you're installing

If you want to install GoogleContacts and keep Aosp Contacts, config should read `GoogleContacts=2` before you flash gapps or addon package.

### How to remove installed AppSet/Package or Addon

Often, we run into issues after installing a particular google app and wish there was an easy way to uninstall them. Well there is!
if for any reason, you wish to uninstall the installed package, there are two ways you can do it

**If you don't want AOSP counterpart back**
- Edit nikgapps.config and set <Addon>=-1 (e.g. GoogleContacts=-1)
- Reflash the zip you flashed in first place to install the addon (for e.g. basic package since it contains GoogleContacts or GoogleContacts addon)

**If you want AOSP counterpack back**
- Uninstall any playstore updates you have for the addon
- Delete the <`#`-addon>.sh file from /system/addon.d folder where `#` is a number before Google App name (e.g. 10-YouTube.sh, 51-YouTube.sh)
- Reflash the rom

# How to control addon.d execution with NikGapps

nikgapps.config comes with another config entry that allows you to control the addon.d execution. 

<table class="ui striped fixed small unstackable table">
  <thead>
    <tr>
      <th  class="six wide center aligned">Config Entry</th>
      <th  class="ten wide">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="center aligned">execute.d</td>
      <td>1 (enabled by default), set to 0 if you want the installer to skip restoring NikGapps upon dirty flashing the rom</td>
    </tr>
  </tbody>
</table>

# Introduction to InstallPartition config

InstallPartition, as the name suggests defines the partition you'd like to install gapps to. Often we come across situation where the available space in our device in `/product` or `/system_ext` space is so less that Gapps are not fully installed in your device. NikGapps now comes with a flexibility to install gapps to your desired partition. 

NikGapps installer reads <code>InstallPartition</code> config from nikgapps.config file which by default is set to `default` value. Which means, nikgapps installer will install gapps to appropriate partition depending on the android version you're installing on. 

if you want to install the gapps in any partition, set the config value to `/<partition>`, where `<partition>` is your desired partition. For e.g.

`InstallPartition=/system_ext`

if you specifically want to install the gapps in `/system` partition, set below config value to `/system`

`InstallPartition=/system`

if you want to install the gapps in `/product` partition, set the config value to `/product`

`InstallPartition=/product`

Similarly, if you want to install the gapps in `/system/product` partition, set the config value to `/system/product` 

`InstallPartition=/system/product`

# How to use nikgapps.config when you're sideloading or running on encrypted storage

You're sideloading your gapps and want to configure your installation? You're running on an encrypted /data partition? You want to configure your installation? well, you can do it using use_zip_config option in nikgapps.config.

use_zip_config is 0 by default which means, nikgapps installer will use nikgapps.config file from supported locations to configure the installation. However, if you set use_zip_config to 1, nikgapps installer will use the nikgapps.config file from the zip you're flashing.

follow below steps to configure your installation 
1. Unpack the zip and open nikgapps.config file in your zip (can be found in afzc/nikgapps.config)
2. Set use_zip_config to 1
3. Make necessary changes in nikgapps.config file
4. Repack and Flash the zip

# How to configure nikgapps.config and enable gms optimization

Please make this change at your own risk, we will not provide any support for this!

Many users prefer to have gms optimized (restricting from always running in the background taking up battery when you're not using your phone). This sounds fun but the outcome is not always ideal. In some cases enabling gms optimization can cause the device to delay the notifications from several apps such as WhatsApp, Telegram, etc. (this is natural since gms is battery optimized and is not actually running for you to provide live notifications). 

We do not encourage you to enable gms optimization unless you're sure you know what you're doing. Hence, we have provided a config entry in nikgapps.config to enable gms optimization. If you want to enable gms optimization, set below config value to 1.

gms_optimization=1


# How to configure nikgapps.config to Debloat files/folders from your device

To debloat files/folders from your device, make an entry of the file/folder you want to debloat in nikgapps.config file at the end of the file where all the package configurations are complete. Below is an example of how you can debloat files/folders from your device.

<div class="ui teal message">
Core=0  
.  
.  
.  
Books=0  
PixelSetupWizard=0  
GoogleTalkback=0  
PixelLiveWallpapers=0  
  
\# NikGapps debloater starts here, add all the stuff to add to debloater.config below (for elite and user builds only)  
\# check examples below  
\# lines starting with '#' indicates comments, do not remove them  
\#   
  
\# You can specify full path starting with '/' like below  
/system/addon.d  
/system/app/YouTube  
/system/app/YouTube/YouTube.apk  
  
\# You can specify the name of the folder you want to remove and nikgapps installer will remove all the files/folders with that name  
YouTube  
</div>

**Note:** You can debloat files/folders from your device only if you're installing Elite build. Debloating is not supported for Stock build.

<p class="ui positive message" style="color:green;">If you have further questions about nikgapps config, you can join the telgram support group or ask in NikGapps XDA thread</p>