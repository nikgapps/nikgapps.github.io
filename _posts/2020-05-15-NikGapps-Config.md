---
layout: post
title: 'All about NikGapps.config'
categories: misc
author: Nikhil Menghani
---

# Introduction

Ever since the aroma installer started to be incompatible with newer versions of recovery, the convenience of customizing the installation has been almost impossible for the users. NikGapps.config offers a solution to the same problem so you can completely control the installation as per your needs. You can choose which package to install, which package to replace corresponding AOSP app with google app, which package to skip.

## What NikGapps.config is and how it works

nikGapps.config is a LF based (more info on LF here) configuration file which allows you to configure your installation the way you like. 
By Editing nikgapps.config, you can skip any Package that you don't want to be part of your installation.

The gapps package that you flash reads `/sdcard/NikGapps/nikgapps.config` to decide how to flash the application
NikGapps installer recognizes 3 config values
-   0 (Skip the package)
-   1 (install the package and delete corresponding aosp app)
-   2 (install the package and do not delete corresponding aosp app)


For e.g. if you want to skip Google Contacts during the installation, you need to open the Gapps Package, go to Packages directory, you will find all the Packages that are part of your NikGapps zip named `<Name>.zip`
the config should read `<Name>=0`
Which means, in our case `GoogleContacts=0`
if you want to install GoogleContacts and remove Aosp Contacts, config should read `GoogleContacts=1`
if you want to install GoogleContacts and keep Aosp Contacts, config should read `GoogleContacts=2`

