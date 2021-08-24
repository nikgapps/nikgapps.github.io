## Nikgapps appset and package information
## Following are the packages with default configuration
## Set Core=0 if you want to skip installing all packages belonging to Core Package (Don't disable this if you know what you are doing)

    Core=1 
    >>ExtraFiles=1
    >>GooglePlayStore=1
    >>GoogleServicesFramework=1
    >>GoogleContactsSyncAdapter=1
    >>GoogleCalendarSyncAdapter=1
    >>GmsCore=1

    DigitalWellbeing=1 (Package for Wellbeing)
    VancedManager=0    (Package for youtube vanced manager)(required for install youtube vanced)
    GoogleMessages=1   (Package for google messages app)
    GoogleDialer=1	   (Package for google dialer app)
    GoogleContacts=1   (Package for google contacts app)
    CarrierServices=1  (Package for message carrier service)
    GoogleClock=1      (Package for google clock app)

## Set SetupWizard=0 if you want to skip installing all packages belonging to SetupWizard Package (Normal non-pixel style setup wizard package)   
    SetupWizard=1  
    >>SetupWizard=1
    >>GoogleRestore=1
    >>GoogleOneTimeInitializer=1


## Set Pixelize=0 if you want to skip installing all packages belonging to Pixelize Package (Pixel style setup wizard like in all pixel series)
    Pixelize=1   
    >>PixelSetupWizard=1 *1
    >>AndroidMigratePrebuilt=1
    >>PixelTips=1
    >>PixelConfigOverlays=1
    
    GoogleCalculator=1        (Package for calculator app)
    Drive=1			          (Package for google drive app)
    GoogleMaps=1		      (Package for google maps app)
    GoogleLocationHistory=1   (Package for Maps location history service)
    Gmail=1                   (Package for google mail app)
    GooglePhotos=1		      (Package for google photoes app)
    DeviceHealthServices=1	  (Package for device battery health service)
    Flipendo=1	 	          (Package for extreme battery saver service)
    Velvet=1	 	          (Package for main google + assistant app)
    GBoard=1		          (Package for google keyboard app)

## Set PixelLauncher=0 if you want to skip installing all packages belonging to PixelLauncher Package  (Replaces aosp or any launcher with the pixel launcher)
    PixelLauncher=1  
    >>PixelLauncher=1
    >>DevicePersonalizationServices=1
    >>QuickAccessWallet=1


## Set GoogleFiles=0 if you want to skip installing all packages belonging to GoogleFiles Package  (it replaces aosp stock file manager with google files manager)
    GoogleFiles=1
    >>GoogleFiles=1
    >>StorageManager=1
    >>DocumentsUIGoogle=1
    
    GoogleRecorder=1     (Installs google recorder app)
    GoogleCalendar=1     (Installs google calender app)
    MarkupGoogle=1       (Installs photoes markup app used in google photos)
    GoogleWallpaper=1    (Installs google based wallpaper app)
    GoogleFeedback=1     (Installs Google Feedback app)
    GooglePartnerSetup=1 (Google Partner Setup is an app that helps you run applications in conjunction with Google products. For example, you can use the
    calendar from your device with a ToDo app that you've just installed)
    GoogleSounds=1       (Replaces stock aosp sounds selector with google sounds)
    AndroidDevicePolicy=1 ( It is for Enterprises)
    GoogleKeep=1          (Installs google notebook app)
    Books=1               (Installs  googbe based e-book app)
    Assistant=1           (Installs standalone assistant app)
    YouTubeMusic=1        (Installs stock youtube music app)
    PlayGames=1           (Installs google play games)
    GoogleTTS=1           (Installs google text-to-speech app)(Used by google when used with voice assistant) 
    GoogleTalkback=1      (Installs google talkback for accessibility for blind persons)
    DeviceSetup=1         (Installs Post-android setup service)
    AndroidAuto=1         (Installs Android auto. Used during driving Car and provides smart assistant)

## Set GoogleChrome=0 if you want to skip installing all packages belonging to GoogleChrome Package (Installs Google Chrome App)
    GoogleChrome=1
    >>GoogleChrome=1
    >>WebViewGoogle=1
    >>TrichromeLibrary=1

## Set Go apps=0 if you want to skip installing the packages belonging to Go Package below. (Installs lite google apps with limited functionality)
    CoreGo=1
    GoogleGo=1
    AssistantGo=1
    MapsGo=1
    NavigationGo=1
    GalleryGo=1
    GmailGo=1

## Following are the Addon packages NikGapps supports
    AdAway=1                       (Used to block ads via editing hosts file. Needs root or can be used with vpn method)
    PixelLiveWallpapers=1		   (Installs Pixel Live wallpapers)
    YouTubeVancedDark15=1		   (Installs Youtube vanced dark version)*2,3
    YouTubeVancedBlack15=1         (Installs Youtube vanced amoled black version)*2,3
    YouTubeVancedMusic=1           (Installs Youtube music vanced)
    PixelSetupWizard=1		       (Installs pixel setup wizard)*1
    GoogleFi=1                     (Installs googleFi app)
    GoogleDuo=1	 		           (Installs google video calling app)
    GoogleDocs=1			       (Installs google documents app)
    GoogleSlides=1			       (Installs google presentation app)
    GoogleSheets=1			       (Installs google excel sheet app)
    YouTube=1			           (Installs normal youtube app)*2
    PokePixLiveWallpapers=1        (Installs more pokemon themed live wallpapers)





## *1 Disable either from the package or from the addon packages. Best if you disable from addon package
## *2 Install only one of the varient. May replace the youtube app when installing package.
## *3 choose only one of the varient Dark or black mode. You may install vanced manager for vanced updates.
