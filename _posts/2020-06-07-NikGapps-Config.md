---
layout: post
title: "All about NikGapps.config"
categories: misc
author: Nikhil Menghani
---

# Introduction

Ever since the aroma installer started to be incompatible with newer versions of recovery, the convenience of customizing the installation has been almost impossible for the users.

**NikGapps.config** offers a solution to the same problem so you can completely control the installation as per your needs.

You can choose which package to install, which package to replace corresponding AOSP app with google app, which package to skip, which partition to install the gapps in.

## What NikGapps.config is and how it works

nikgapps.config is a LF based (Unix Line Ending, more info on LF <a target="_blank" href="https://notepadunix2dos.info/">here</a>) configuration file which allows you to configure your installation the way you like.

By Editing nikgapps.config, you can skip any Package that you don't want to be part of your installation.

Any NikGapps package that you flash reads `/sdcard/NikGapps/nikgapps.config` file to perform the installation. if the installer doesn't find **nikgapps.config**, it automatically creates the file for you so you can configure it the way you want.

If you wish to customize the installation for your first NikGapps installation, you can download nikgapps.config from <a target="_blank" href="https://sourceforge.net/projects/nikgapps/files/Releases/Config/nikgapps-config">here</a> and place it in `/sdcard/NikGapps` folder and then start configuring.

All the lines starting with # are comments. NikGapps installer recognizes the uncommented lines and performs the installation based on the config value.

### How you can configure your installation

NikGapps installer recognizes 3 config values for every package that it installs.

<table class="ui striped fixed small unstackable table">
  <thead>
    <tr>
      <th  class="six wide center aligned">Value</th>
      <th  class="ten wide">Actions</th>
    </tr>
  </thead>
  <tbody>
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

For example, if you want to skip 'Google Contacts' during the installation, you need to open the Gapps Package, go to Packages directory, you will find all the Packages that are part of your NikGapps zip named `<Name>.zip` the config should read `<Name>=0`

Which means, in our case `GoogleContacts=0`.

If you want to install GoogleContacts and remove Aosp Contacts, config should read `GoogleContacts=1`.

Similarly, if you want to install GoogleContacts and keep Aosp Contacts, config should read `GoogleContacts=2`.

Pretty simple, right?

### Introduction to InstallPartition config

<ul class="divider">
  <li>There are devices with Roms having separate <code>/product</code> partition which is designed to store vendor specific files and is usually less in size.</li>

  <li>Starting Android 10, gapps are installed in <code>/product</code> partition as opposed to lower versions in which gapps are installed in `/system` partition.</li>

  <li>For the devices with separate <code>/product</code> partition, NikGapps allows you to choose which partition you want to install the gapps in. You can flash android 10 based gapps in `/system` partition.</li>

  <li>NikGapps installer reads <code>InstallPartition</code> config from nikgapps.config file to decide whether to install the gapps in <code>/system</code> partition or <code>/system/product</code> partition.</li>

  <li>By Default, the config value is commented, the installation will happen as usual like it used to before.</li>
</ul>

<p class="ui negative message">If you are unsure about the config, leave it as it is, NikGapps will be installed where gapps are required to be installed</p>

if you specifically want to install the gapps in `/system` partition, set below config value to `system`

`InstallPartition=system`

if you want to install the gapps in `/system/product` partition, set the config value to `product`

`InstallPartition=product`

<p class="ui positive message" style="color:green;">If you have further questions about nikgapps config, you can join the telgram support group or ask in NikGapps XDA thread</p>
