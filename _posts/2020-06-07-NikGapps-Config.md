---
layout: post
title: 'All about NikGapps.config'
categories: misc
author: Nikhil Menghani
---

# Introduction

Ever since the aroma installer started to be incompatible with newer versions of recovery, the convenience of customizing the installation has been almost impossible for the users. NikGapps.config offers a solution to the same problem so you can completely control the installation as per your needs. You can choose which package to install, which package to replace corresponding AOSP app with google app, which package to skip, which partition to install the gapps in.

## What NikGapps.config is and how it works

nikgapps.config is a LF based (Unix Line Ending, more info on LF <a style="color:#2C3E50;" href="https://notepadunix2dos.info/">here</a>) configuration file which allows you to configure your installation the way you like. 
By Editing nikgapps.config, you can skip any Package that you don't want to be part of your installation.

Any NikGapps package that you flash reads `/sdcard/NikGapps/nikgapps.config` file to perform the installation. if the installer doesn't find nikgapps.config, it automatically creates the file for you so you can configure it the way you want.

If you wish to customize the installation for your first NikGapps installation, you can download nikgapps.config from here and place it in `/sdcard/NikGapps` folder and then start configuring.  
All the lines starting with # are comments. NikGapps installer recognizes the uncommented lines and performs the installation based on the config value.

### How you can configure your installation

NikGapps installer recognizes 3 config values for every package that it installs
-   0 (Skip the package)
-   1 (install the package and delete corresponding aosp app)
-   2 (install the package and do not delete corresponding aosp app)

For e.g. if you want to skip Google Contacts during the installation, you need to open the Gapps Package, go to Packages directory, you will find all the Packages that are part of your NikGapps zip named `<Name>.zip` the config should read `<Name>=0`  
Which means, in our case `GoogleContacts=0`  
if you want to install GoogleContacts and remove Aosp Contacts, config should read `GoogleContacts=1`  
if you want to install GoogleContacts and keep Aosp Contacts, config should read `GoogleContacts=2`  

### Introduction to InstallPartition config

-- There are devices with Roms having separate `/product` partition which is designed to store vendor specific files and is usually less in size.  
-- Starting Android 10, gapps are installed in `/product` partition as opposed to lower versions in which gapps are installed in `/system` partition.  
-- For the devices with separate `/product` partition, NikGapps allows you to choose which partition you want to install the gapps in. You can flash android 10 based gapps in `/system` partition.  
-- NikGapps installer reads `InstallPartition` config from nikgapps.config file to decide whether to install the gapps in `/system` partition or `/system/product` partition  
-- By Default, the config value is commented, if you are unsure of what it does, do not uncomment it  

For e.g. if you want to install the gapps in `/system` partition, set below config value to `system`  

`InstallPartition=system`  

if you want to install the gapps in `/system/product` partition, set the config value to `product`  

`InstallPartition=product`  


<p style="color:green;">If you have further questions about nikgapps config, you can join the telgram support group or ask in NikGapps XDA thread</p>