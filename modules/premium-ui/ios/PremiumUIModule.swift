import ExpoModulesCore
import ExpoUI

public class GlassCardModule: Module {
  public func definition() -> ModuleDefinition {
    Name("GlassCard")

    // Register GlassCardView as an ExpoUI SwiftUI view
    ExpoUIView(GlassCardView.self)
  }
}
