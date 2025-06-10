import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import Firebase
import FirebaseMessaging
import UserNotifications
import UserNotificationsUI
@main
class AppDelegate: UIResponder, UIApplicationDelegate ,UNUserNotificationCenterDelegate{
  var window: UIWindow?

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()
    if #available(iOS 10.0, *) {

            let center  = UNUserNotificationCenter.current()

            center.requestAuthorization(options: [.sound, .alert, .badge]) { (granted, error) in

              if error == nil{

                DispatchQueue.main.async {

                  UIApplication.shared.registerForRemoteNotifications()

                }

              }

            }

        }else {

          UIApplication.shared.registerUserNotificationSettings(UIUserNotificationSettings(types: [.sound, .alert, .badge], categories: nil))

          UIApplication.shared.registerForRemoteNotifications()

        }
    FirebaseApp.configure()
    UNUserNotificationCenter.current().delegate = self
    reactNativeDelegate = delegate
    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)

    factory.startReactNative(
      withModuleName: "poc",
      in: window,
      launchOptions: launchOptions
    )

    return true
  }
}


class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
