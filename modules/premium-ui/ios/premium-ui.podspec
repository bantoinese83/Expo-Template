require 'json'

package = JSON.parse(File.read(File.join(__dir__, '..', 'package.json')))

Pod::Spec.new do |s|
  s.name           = 'premium-ui'
  s.version        = package['version'] || '1.0.0'
  s.summary        = package['description'] || 'Premium SwiftUI components for Expo'
  s.description    = package['description'] || 'Premium SwiftUI components for Expo'
  s.license        = 'MIT'
  s.author         = 'PremiumUI Developers'
  s.homepage       = 'https://github.com/expo/expo'
  s.platforms      = { :ios => '15.1' }
  s.swift_version  = '5.9'
  s.source         = { :git => '' }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'
  s.dependency 'ExpoUI'

  s.source_files = "**/*.{h,m,swift}"
end
