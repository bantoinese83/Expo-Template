import SwiftUI
import ExpoModulesCore
import ExpoUI

// Props class extending UIBaseViewProps to inherit modifier support
final class GlassCardViewProps: UIBaseViewProps {
  @Field var title: String?
  @Field var content: String?
}

// SwiftUI View conforming to ExpoSwiftUI.View
struct GlassCardView: ExpoSwiftUI.View {
  @ObservedObject public var props: GlassCardViewProps

  var body: some View {
    VStack(alignment: .leading, spacing: 12) {
      if let title = props.title, !title.isEmpty {
        Text(title)
          .font(.system(size: 22, weight: .bold, design: .rounded))
          .foregroundColor(.primary)
      }
      
      if let content = props.content, !content.isEmpty {
        Text(content)
          .font(.system(size: 16, weight: .medium, design: .rounded))
          .foregroundColor(.secondary)
      }
    }
    .padding(20)
    .frame(maxWidth: .infinity, alignment: .leading)
    .background(
      ZStack {
        // Blur background using modern native SwiftUI Material
        if #available(iOS 15.0, *) {
          Rectangle()
            .fill(.ultraThinMaterial)
        } else {
          Color.black.opacity(0.3)
        }
        
        // Gradient overlay for sleek glassmorphic shine
        LinearGradient(
          colors: [.white.opacity(0.15), .clear],
          startPoint: .topLeading,
          endPoint: .bottomTrailing
        )
      }
    )
    .clipShape(RoundedRectangle(cornerRadius: 24, style: .continuous))
    .overlay(
      RoundedRectangle(cornerRadius: 24, style: .continuous)
        .stroke(.white.opacity(0.2), lineWidth: 1)
    )
    .shadow(color: .black.opacity(0.15), radius: 20, x: 0, y: 10)
  }
}
