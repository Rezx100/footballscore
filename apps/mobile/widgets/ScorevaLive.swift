import SwiftUI
import WidgetKit

/// Scoreva Live Activity + home-screen widget.
/// Wired in the EAS production native project (`eas build`). Expo Go renders the
/// same compact tracker via `screens/WidgetPreviewScreen`.

struct ScorevaEntry: TimelineEntry {
  let date: Date
  let home: String
  let away: String
  let homeScore: Int
  let awayScore: Int
  let minute: Int
}

struct ScorevaProvider: TimelineProvider {
  func placeholder(in context: Context) -> ScorevaEntry {
    ScorevaEntry(date: Date(), home: "ARS", away: "CHE", homeScore: 2, awayScore: 1, minute: 67)
  }
  func getSnapshot(in context: Context, completion: @escaping (ScorevaEntry) -> Void) {
    completion(placeholder(in: context))
  }
  func getTimeline(in context: Context, completion: @escaping (Timeline<ScorevaEntry>) -> Void) {
    completion(Timeline(entries: [placeholder(in: context)], policy: .after(Date().addingTimeInterval(30))))
  }
}

struct ScorevaWidgetEntryView: View {
  var entry: ScorevaEntry
  var body: some View {
    VStack(alignment: .leading, spacing: 6) {
      Text("LIVE \(entry.minute)’").font(.caption.monospaced()).foregroundStyle(Color(red: 0.84, green: 1, blue: 0.24))
      HStack {
        Text(entry.home)
        Spacer()
        Text("\(entry.homeScore)").font(.title.monospaced())
      }
      HStack {
        Text(entry.away)
        Spacer()
        Text("\(entry.awayScore)").font(.title.monospaced())
      }
    }
    .padding()
    .containerBackground(Color(red: 0.03, green: 0.035, blue: 0.05), for: .widget)
  }
}

@main
struct ScorevaWidgets: Widget {
  var body: some WidgetConfiguration {
    StaticConfiguration(kind: "ScorevaLive", provider: ScorevaProvider()) { entry in
      ScorevaWidgetEntryView(entry: entry)
    }
    .configurationDisplayName("Scoreva Live")
    .description("Live match on the home screen.")
    .supportedFamilies([.systemSmall, .systemMedium])
  }
}
