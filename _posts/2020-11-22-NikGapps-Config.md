---
layout: post
title: "All about NikGapps.config"
categories: misc
author: Nikhil Menghani
---

# Introduction

Ever since the aroma installer started to be incompatible with newer versions of recovery, the convenience of customizing the installation has been almost impossible for the users. **nikgapps.config** offers a solution to the same problem so you can completely control the installation as per your needs. You can choose which package to install, which package to skip, which package to replace corresponding AOSP app with google app, which partition to install the gapps in. Keep reading if you're looking for a way to setup your own custom variant of google apps. 

## What nikgapps.config is and how it works

nikgapps.config is a configuration file which allows you to completely configure your installation.

Any NikGapps package that you flash reads a config file named `nikgapps.config` which is located inside `/sdcard/NikGapps` folder to perform the installation. To make it convenient for users, `nikgapps.config` can also be located at different locations, the location preference is listed below.  

#### nikgapps.config location preferences
1. "/tmp/nikgapps.config"
2. "$ZIPDIR/nikgapps.config" where ZIPDIR is the directory NikGapps package is located
3. "/sdcard1/nikgapps.config"
4. "/sdcard1/NikGapps/nikgapps.config"
5. "/sdcard/nikgapps.config"
6. "/sdcard/NikGapps/nikgapps.config"

If the installer doesn't find **nikgapps.config**, it automatically creates the file for you so you can configure it the way you want.

### How to setup nikgapps.config for first time users

You can download nikgapps.config from <a target="_blank" href="https://sourceforge.net/projects/nikgapps/files/Releases/Config/nikgapps-config">here</a> and place it in `/sdcard/NikGapps` folder and then start configuring. Alternatively, you can also extract nikgapps.config from the gapps zip and place it in `/sdcard/NikGapps`. 

### Understanding nikgapps.config and using it to configure your installation

nikgapps.config is a LF based (more info on LF <a target="_blank" href="https://notepadunix2dos.info/">here</a>) configuration file. By editing nikgapps.config, you can skip any Package that you don't want to be part of your installation.

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

In addition to controlling how individual package behaves, you can also control how the installer behaves. `nikgapps.config` allows you to control which partiton you want to install your gapps in (handy when you're storage space for system or product partition is full), whether or not you want to wipe dalvik/cache during your installation and simply uninstall a package that you accidentally installed. 

First things first, let's find out how to skip installing a package or a set of apps also called `AppSet`.

### How to skip installing a Package/AppSet

For instance, if you want to skip installing `Google Contacts`, all you need to do is open nikgapps.config and find an entry of Google Contacts (usually the spaces are trimmed and the entry you will find will be GoogleContacts). In order to skip installing the package, the config should read `<Name>=0` ; where `<Name>` is package name. Which means, in our case `GoogleContacts=0`.

If you want to install GoogleContacts and remove Aosp Contacts, config should read `GoogleContacts=1`.

Similarly, if you want to install GoogleContacts and keep Aosp Contacts, config should read `GoogleContacts=2`.

However, if you accidentally missed configuring a package and you ended up having it installed in your system occupying additional space, there is an easy way to uninstall it. All you need to do is set `GoogleContacts=-1` in nikgapps.config. This will indicate that you don't want GoogleContacts. Now, for the installer to remove all the files that were added with the installation of GoogleContacts, the installer needs to contain GoogleContacts package in it. Thus, you can reflash NikGapps-omni for instance that has GoogleContacts in it. You can also flash NikGapps-macro since that also has GoogleContacts in it. Similarly NikGapps-stock and NikGapps-full. Now, flashing the gapps would reflash all the apps and unnecessary take up time. To prevent that from happening you can tell nikgapps.config to only focus on uninstalling by setting `mode=uninstall` (you will find this config set to `install` by default).

In summary, if you wish to uninstall any addon, set `<AddonName>=-1`, `mode=uninstall` and reflash the addon/gapps containing the Package.

## How to control addon.d execution with NikGapps

nikgapps.config comes with 4 more config entries that allows you to control the addon.d execution. 

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
    <tr>
      <td class="center aligned">mount.d</td>
      <td>1 (enabled by default), set to 0 if you don't want the installer to run partition mounting functions</td>
    </tr>
    <tr>
      <td class="center aligned">unmount.d</td>
      <td>1 (enabled by default), set to 0 if you don't want the installer to run partition unmounting functions</td>
    </tr>
    <tr>
      <td class="center aligned">addon_version.d</td>
      <td>2 (by default), set to 3 if you are using lineageOs recovery or using latest los build</td>
    </tr>
  </tbody>
</table>

## Introduction to InstallPartition config

There are devices with Roms having separate <code>/product</code> partition which is designed to store vendor specific files and is usually less in size.

Starting Android 10, gapps are installed in <code>/product</code> partition as opposed to lower versions in which gapps are installed in `/system` partition.

For the devices with separate <code>/product</code> partition, NikGapps allows you to choose which partition you want to install the gapps in. You can flash android 10 based gapps in `/system` partition.

NikGapps installer reads <code>InstallPartition</code> config from nikgapps.config file to decide whether to install the gapps in <code>/system</code> partition or <code>/system/product</code> partition.

By Default, the config value is commented, the installation will happen as usual like it used to before.

<p class="ui negative message">If you are unsure about the config, leave it as it is, NikGapps will be installed where gapps are required to be installed</p>

if you specifically want to install the gapps in `/system` partition, set below config value to `system`

`InstallPartition=system`

if you want to install the gapps in `/system/product` partition, set the config value to `product`

`InstallPartition=product`

<p class="ui positive message" style="color:green;">If you have further questions about nikgapps config, you can join the telgram support group or ask in NikGapps XDA thread</p>
