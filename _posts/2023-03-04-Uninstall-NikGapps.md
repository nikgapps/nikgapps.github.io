---
layout: post
title: "Uninstall NikGapps Completely"
categories: misc
author: Nikhil Menghani
---

* This will become a table of contents (this text will be scrapped).
{:toc}

# Uninstall NikGapps

You can uninstall NikGapps completely or selectively. Completely means you are removing all the traces of NikGapps from your system. Selectively means you are removing only the packages that you don't want.

## Uninstall NikGapps completely (This will remove all the traces of NikGapps from your system)

### Uninstall by configuring nikgapps.config file
- set execute.d=0 in nikgapps.config
- reflash your Rom

**Note:** this method only works if you have decrypted storage, for encrypted method check the renaming or sideloading method.

### Uninstall by renaming the zip to Uninstall.zip and flashing it
- Rename the zip you flashed to `UnInstall.zip` (for e.g. `NikGapps-core-arm64-20210410.zip` to `UnInstall.zip`)
- Flash the zip to your device

**Note:** this method is supported only when you are not sideloading the zip, when you sideload the zip, the name of the file you are flashing changes and the installer will not be able to recognize your instructions to uninstall the apps. In this case, use the sideloading method.

### Uninstall by sideloading the zip
- Open `zip_name.txt` file from the NikGapps zip you want to sideload
- Change/Edit the text contents from `zip_name.txt` file which reads the actual file name (for e.g. `NikGapps-core-arm64-20210410.zip`) to `UnInstall.zip`.
- Save `zip_name.txt`
- Sideload the zip in recovery (The installer reads the instruction from `zip_name.txt` and when it finds `UnInstall.zip` in it, it runs the uninstaller instead of standard installer)

**Note:** this method is supported only when you are sideloading the zip, when you are not sideloading the zip, the name of the file you are flashing changes and the installer will not be able to recognize your instructions to uninstall the apps. In this case, use the renaming method.

### Ultimate Method (when none of the above method is applicable to you)  

- Uninstall all the playstore updates of google apps that you want to uninstall (settings -> apps -> find your app -> uninstall updates)
- Find files with name `#-<Package>.sh`  in /system/addon.d folder where # can be any number (usually 10, 50 or 51) and delete all the files (for e.g. `10-YouTube.sh`, `10-GoogleDialer.sh`, etc)
- Reflash your Rom

**Note:** if you are unable to delete the files in /system/addon.d (devices with super partition don't have the flexibility of deleting files in system), you can use NikGapps Debloater. 
Make an entry `/system/addon.d` in debloater.config, place the file in /sdcard/NikGapps folder and flash the NikGapps Debloater.

## Uninstall selected packages

### Uninstall by configuring nikgapps.config file
- Uninstall the playstore updates of the app
- Set `<Package>=-1` in nikgapps.config (for e.g. `YouTube=-1`)
- Reflash the zip that you flashed to get the package in first place
- Reflash your Rom (if you want your aosp counterpart back)

**Note:** this method only works if you have decrypted storage, for encrypted method check the renaming or sideloading method.

### Uninstall by renaming the zip to Uninstall.zip and flashing it
- Rename the zip you flashed to `UnInstall.zip` (for e.g. `YouTube.zip` to `UnInstall.zip`)
- Flash the zip to your device

**Note:** this method is supported only when you are not sideloading the zip, when you sideload the zip, the name of the file you are flashing changes and the installer will not be able to recognize your instructions to uninstall the apps. In this case, use the sideloading method.

### Uninstall by sideloading the zip
- Edit `zip_name.txt` file in the zip and rename the actual file name to `UnInstall.zip` (for e.g. `YouTube.zip` to `UnInstall.zip`)
- Sideload the zip in recovery

**Note:** this method is supported only when you are sideloading the zip, when you are not sideloading the zip, the name of the file you are flashing changes and the installer will not be able to recognize your instructions to uninstall the apps. In this case, use the renaming method.

### Ultimate Method (when none of the above method is applicable to you)  

- Uninstall all the playstore updates of google apps that you want to uninstall (settings -> apps -> find your app -> uninstall updates)
- Find files with name `#-<Package>.sh`  in /system/addon.d folder where # can be any number (usually 10, 50 or 51) and delete all the files (for e.g. `10-YouTube.sh`, etc)
- Reflash your Rom

**Note:** if you are unable to delete the files in /system/addon.d (devices with super partition don't have the flexibility of deleting files in system), you can use NikGapps Debloater. 
Make an entry `/system/addon.d` in debloater.config, place the file in /sdcard/NikGapps folder and flash the NikGapps Debloater.
