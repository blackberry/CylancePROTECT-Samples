# CylancePROTECT API - C#/.NET Sample App with WPF

## Overview

This sample application demonstrates how the Cylance REST APIs and TCP SYSLOG stream can be integrated into a form user interface application called 'CylanceSampleWPFApp'. 

#### CylancePROTECT REST API
The CylancePROTECT API allows developers to make REST requests to view and change their Cylance workspace: Users, Threats, InstaQueries, etc. This can be useful for automating enterprise IT. For example, enrolling new devices with a quick script instead of navigating all the Cylance dashboards.  

#### Cylance SYSLOG
The CylancePROTECT console streams SYSLOG events from all its connected endpoints in real-time. This stream can be extended and pointed at your custom solution. The data is a log of Cylance events and can be used to conduct detailed analysis and trace security threats. 

## Prerequisites 
- .NETFramework,Version v4.7.2
- JWT v8.9.0
- Newtonsoft v13.0.1

Note: this was developed using Visual Studio 2022

## Getting Started

#### Setup Cylance API Keys
1. Log into Cylance PROTECT 
2. Settings -> Inegrations
![Settings Integrations](Resources/Readme/SettingsIntegrations.png?raw=true "Settings Integrations")
3. Add Application -> Select App Privileges -> Save
![App Privileges](Resources/Readme/AppPrivileges.png?raw=true "App Privileges")
4. Copy the three keys into the CylanceConfig.JSON: tenantId, appId, appSecret
![API Keys to CylanceConfig.json](Resources/Readme/CylanceAPIKeys.png?raw=true "API Keys to CylanceConfig.json")

#### Setup Cylance API Keys
1. Log into Cylance PROTECT 
2. Settings -> Applications
![Settings Application](Resources/Readme/SettingsApplication.png?raw=true "Settings Application")
3. Cylance SYSLOG Configure - Enter TCP endpoint domain and port 
![SYSLOG Config](Resources/Readme/SyslogConfig.png?raw=true "SYSLOG Config")

#### How to Build and Run
1. `open project in Visual Studio`
2. Manage NuGet Package for Solution , install all prerequisites
3. Edit the Cylance Config file with the respective API keys.
4. `Start/Build`<CylanceSampleWPFAppMain.cs>

## Getting Help

### Documentation

For detailed documentation on the CylancePROTECT REST API, please see the [CylancePROTECT API Guide](https://docs.blackberry.com/content/dam/docs-blackberry-com/release-pdfs/en/cylance-products/api-and-developer-guides/Cylance_User_API_Guide_2.0rev35.pdf).

For detailed documentation on Cylance SYSLOG, please see the [Cylance SYSLOG Guide](https://docs.blackberry.com/content/dam/docs-blackberry-com/release-pdfs/en/cylance-syslog-guide/july-2022/Cylance_Syslog_Guide.pdf).

### Support

To get help from BlackBerry and other developers or to provide feedback please join the [BlackBerry Beta Community](https://ebeta.blackberry.com/key/join). You can also contact us @ https://developers.blackberry.com/us/en/support. 

Sample written by Alvin Chan. 

## License

Apache 2.0 LicenseApache 2.0 License
