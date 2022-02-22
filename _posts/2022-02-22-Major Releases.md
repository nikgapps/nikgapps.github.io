---
layout: post
title: "Major Releases"
categories: misc
author: Nikhil Menghani
---

* This will become a table of contents (this text will be scrapped).
{:toc}

# 22nd February, 2022

This is a major release which introduces many fixes, improvements and new features. 
Changelog of this release is as follows:

- Introduce Smart Installation to address storage full issues
- Added space check before installing packages to ensure that system is never left into inconsistent state
- Revamped and improved NikGapps uninstallation mechanism
- Fixed an issue where custom locations for nikgapps.config were not recognized
- A lot of installer script improvements and fixes under the hood
- Made gms optimization configurable (using gms_optimization config starting v20)
- Control all the features of nikgapps.config through config builds
- Fixed an issue where dirty flashing Gboard failed even when Gboard was originally clean flashed
- nikgapps.config bumped up to v20
- Changed addon script name from <50-package>.sh to <51-package>.sh to let Rom script execute first
- Abort when unknown mode is detected
- Addon.d improvements
- Revert back to google setup wizard as default (flash PixelSetupWizard addon for pixel setup wizard)

## Smart Installation

This release introduces a new feature which is smart installation. The main idea behind this is to make the installation process more reliable. The idea is to check if the partition has enough space to install the package. if not, then the installer will cycle through other partitions and try to install the package. This is done by checking the size of the partition and the size of the package. If the partition is smaller than the package, then the installer will not install the package rather look for space in other partition.

For. e.g. while installing YouTube, if the size available in /product is 100 MB and /system has 200 MB left, the installer will check for the YouTube package size, if the size of the package is 110 MB, then the installer will not install the package in /product. It will install the app in /system partition which has enough space.

if /system is out of space, the installer will check for space in /system_ext (in devices that has /system_ext partition).

Since /product partition still has 100 MB left, the installer will move on to next app (say Google Calculator) and look for space in /product. Since Google Calculator is smaller in size (say 40 MB), it will get installed to /product partition.

This ensures that all the partitions are fully utilized before we run out of space.

## NikGapps UnInstaller

Many users asked for an uninstaller zip to uninstall NikGapps, well, we made it simpler, we made the installer multipurpose. Now, you don't need to download 2 different zip files (one to install and other to uninstall), now if you want to uninstall NikGapps, you can use the same zip you used to install NikGapps in first place.

NikGapps offers the ability to uninstall it just by renaming the zip to `UnInstall.zip` and then flashing it in recovery.
The name is not case sensitive, it can be of any case as long as it reads `uninstall.zip`. You can try `Uninstall.zip` or `UnINStall.zip`, all will work the same.

This implementation also doesn't rely on `mode` config in nikgapps.config, as long as the name reads uninstall.zip, the zip file will acts as an uninstaller. 

The uninstaller will uninstall all the packages in the zip file. So make sure that you have the correct zip file for the package you want to uninstall.

## Installer Improvements

A lot of installer script improvements and fixes under the hood

- Fixed an issue where custom locations for nikgapps.config were not recognized
- Fixed an issue where dirty flashing Gboard failed even when Gboard was originally clean flashed
- Revamped and improved NikGapps uninstallation mechanism
- Abort when unknown mode is detected
- Addon.d improvements
- Changed addon script name from 50-<package>.sh to 51-<package>.sh to let Rom script execute first

## nikgapps.config v20

v20 of nikgapps.config introduces gms_optimization config. This config is set to 0 by default. It allows you to control gms optimization during installation. Read more about it [here](https://nikgapps.com/misc/2022/02/22/NikGapps-Config.html#how-to-configure-nikgappsconfig-and-enable-gms-optimization).

## More control in NikGapps custom build

Until now, the config files that were uploaded to build [custom builds](https://github.com/nikgapps/config), were only capable of reading the Package values and build gapps on top of it. The features were limited to only reading the Package values. When a user wanted to install gapps to a specific partition, it did not reflect the changes in the config file. 

Now, you have full control over the builds you create, you can configure nikgapps.config once and the installer will use your config while flashing the gapps. You no longer have to maintain the config file in your /sdcard/NikGapps folder, the installer from custom builds will pick the config file that you have uploaded and flash accordingly.

# Download

You can download the builds from here:


[Android 12 Gapps](https://sourceforge.net/projects/nikgapps/files/Releases/NikGapps-S/22-Feb-2022/) | [Android 12 Addons](https://sourceforge.net/projects/nikgapps/files/Releases/Addons-S/22-Feb-2022/)  
[Android 11 Gapps](https://sourceforge.net/projects/nikgapps/files/Releases/NikGapps-R/22-Feb-2022/)  | [Android 11 Addons](https://sourceforge.net/projects/nikgapps/files/Releases/Addons-R/22-Feb-2022/)  
[Android 10 Gapps](https://sourceforge.net/projects/nikgapps/files/Releases/NikGapps-Q/22-Feb-2022/)  | [Android 10 Addons](https://sourceforge.net/projects/nikgapps/files/Releases/Addons-Q/22-Feb-2022/)  
