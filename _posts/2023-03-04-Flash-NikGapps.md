---
layout: post
title: "How to Install NikGapps"
categories: misc
author: Nikhil Menghani
---

* This will become a table of contents (this text will be scrapped).
{:toc}

# How to Flash NikGapps

## Pre-requisites

- Understand the code name of android version (for e.g. T is for Android 13, SL is for Android 12.1 and so on) from [here](https://nikgapps.com)
- Get the package details from [here](https://nikgapps.com/downloads)
- For Stable Releases (Recommended), download the zip from [here](https://sourceforge.net/projects/nikgapps/files/Releases/) (Releases folder)
- For Canary Releases (experimental with new features), download the zip from [here](https://sourceforge.net/projects/nikgapps/files/Canary-Releases/) (Canary Releases folder)
- Go to Android Version folder (for e.g. for Android 13, go to NikGapps-T folder, for Addons, go to Addons-T folder)

## How to clean flash NikGapps

### For A/B devices

- Flash Rom (the Rom is installed on inactive slot for e.g. Slot A)
- Reboot to recovery (You will be in Slot A now)
- Flash NikGapps (NikGapps will be installed on Slot A now)
- Wipe /data
- Reboot

### For A-only devices

- Flash Rom
- Flash NikGapps
- Wipe /data
- Reboot

## How to dirty flash NikGapps (without losing data) or Update NikGapps (between newer versions)

If you are trying to reflash NikGapps or trying to update NikGapps between newer versions (for e.g. 20230304 to 20230305), follow below steps.

- Uninstall NikGapps completely (check [this](https://nikgapps.com/misc/2023/03/04/Uninstall-NikGapps.html) for instructions)
- Reflash your Rom from recovery
- Reflash NikGapps
- Reboot

**Note**: You don't really need to update NikGapps between newer versions unless the changelog contains changes that impacts you. For e.g. if the changelog contains a bug fix with Google Photos app, you should update NikGapps only if you are facing the bug. The NikGapps-core users will not need to update here since the bug is not related to core.

# How to Upgrade NikGapps (between android versions)

If you are trying to upgrade between android versions (for e.g. Los 19.1 to 20), follow below steps.

- Uninstall Playstore updates of Google Apps (settings -> apps -> find your app -> uninstall updates)
- Go to /system/addon.d folder and delete all the scripts that has Google Apps name in it (for e.g. 10-YouTube.sh). A prepending number (10) can be different with time.
- Dirty flash Rom
- Flash newer version of NikGapps
- Reboot

# How to Switch between NikGapps Variants (Core, Stock, Full, etc)

When you are switching between NikGapps variants (for e.g. Stock -> Core or Core -> Basic), it is advised to wipe /data for best results. If you cannot wipe data and would still like to switch between variants, follow below steps.

### Moving from lower to higher variant (for e.g. core -> basic, core -> stock, stock -> full, etc)

- Wipe Runtime Permissions by deleting `/data/misc_de/*/apexdata/com.android.permission/runtime_permissions.xml` for android 11 or above and `/data/system/users/0/runtime_permissions.xml` for android 10 or below
- Dirty Flash NikGapps 

### Moving from higher to lower variant (for e.g. full -> stock, stock -> core, basic -> core, etc)

- Uninstall NikGapps completely (check [this](https://nikgapps.com/misc/2023/03/04/Uninstall-NikGapps.html) for instructions)
- Reflash your Rom from recovery
- Wipe Runtime Permissions by deleting `/data/misc_de/*/apexdata/com.android.permission/runtime_permissions.xml` for android 11 or above and `/data/system/users/0/runtime_permissions.xml` for android 10 or below
- Reflash NikGapps

**Note**: You may run into issues with apps that requires clean flash such as Android Auto, Google Search (Velvet), Google Clock, etc. If you face issues, please wipe /data to resolve it.