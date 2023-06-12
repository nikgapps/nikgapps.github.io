---
layout: post
title: "NikGapps Elites"
categories: misc
author: Nikhil Menghani
---

* This will become a table of contents (this text will be scrapped).
{:toc}


# Introducing NikGapps Elites: Rewarding Our Valuable Contributors

Greetings everyone,

Today, we’re excited to introduce NikGapps Elites, an initiative designed to recognize and honor the invaluable contributions made to the NikGapps project.

Since our inception, NikGapps has been empowered by the unwavering support from our committed community. Whether it's monetary donations, ROM recommendations, or invaluable code contributions, every act has played a pivotal role in shaping NikGapps into its current form. Today, we're opening doors to the NikGapps Elites program to those who have contributed to NikGapps or intend to do so in future.

## Exclusive Benefits for NikGapps Elites

- **Highly Compressed Zip Files**: Saving your data and speeding up downloads.
- **Signed Zips**: Ensuring a secure and reliable NikGapps experience.
- **Consistent Releases**: A personalized build automatically created with every stable release. No need for manual custom build requests, saving your time.
- **Exclusive Folder on Sourceforge**: A dedicated folder for your personalized builds on Sourceforge.
- **Personally Validated Builds**: Ensuring packages don’t conflict for a seamless user experience, you don't run into errors while flashing the builds just because the chosen combination of pacakges wasn't right.
- **Device Specific Builds**: Rom Devs can establish a device specific folder for their ROM depending on the configuration of the device, allowing users to download a build tailored to their device. Instead of suggesting separate NikGapps core and addons, Rom Devs can recommend a single `NikGapps-DeviceName-arm64-1x-YYYYMMDD-signed.zip` file with all components included.
- **Name in the Recovery**: A special badge of honor (Coming soon).

While the NikGapps Elites program is about appreciating past contributors, it's also a call to more people to join us in this mission. Whether it's a donation, ROM recommendation, or code contribution, every act helps in advancing NikGapps.

For more details on the NikGapps Elites program on how to join and how it works, check below thread

## How to Join NikGapps Elites

- **Step 1**: Join the contributors list by making a contribution in one of the following 3 ways
    1. [Become a sponsor](https://github.com/sponsors/nikgapps) or Make a donation of any amount to NikGapps via [PayPal](https://www.paypal.com/paypalme/inikhilmenghani) or [Patreon](https://www.patreon.com/nikgapps).
    2. Recommend NikGapps to your ROM.
    3. Contribute code to NikGapps or help address a critical issue.
- **Step 2**: Create an issue [here](https://github.com/nikgapps/config/issues/new), add brief details of your contribution in the issue description for nikgapps team to review and add the folder name you need access to in the issue title. Example: `Add me to NikGapps Elites: <folder_name>` or refer [this](https://github.com/nikgapps/config/issues/7149).
- **Step 3**: Once your contribution is verified, your github account will be added to the NikGapps Elites list and you will then be able to configure your elite build (check below on how).

## NikGapps Elites: Configuration and Working

- Similar to [creating user builds](https://github.com/nikgapps/config), you can now create an elite build by submitting a pull request to the elite folder.
- Create a (pre-approved from issue) folder and config file at `elite/<android_version>/<folder_name>/<elite>.config` in fork of [config](https://github.com/nikgapps/config) repo and send a pull request.
- The `android_version` signifies the Android version of your elite build, while `folder_name` indicates the name of your dedicated folder on SourceForge where your elite build will be hosted.
- You can have multiple folders under your name for different purposes, such as personal builds and supporting device builds.
- Each new stable release automatically generates an elite build [here](https://sourceforge.net/projects/nikgapps/files/Elite-Releases/) that is made available in your dedicated SourceForge folder.

## FAQs

Head over to [FAQs page](https://nikgapps.com/faqs#elite) to get answers to some of the most common questions about NikGapps Elites.


Thank you for your support, and a warm welcome to NikGapps Elites!
