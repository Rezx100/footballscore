package app.scoreva.widget

import androidx.glance.appwidget.GlanceAppWidget
import androidx.glance.appwidget.GlanceAppWidgetReceiver
import androidx.glance.appwidget.provideContent
import androidx.glance.GlanceId
import androidx.glance.GlanceModifier
import androidx.glance.layout.Column
import androidx.glance.text.Text
import android.content.Context

/** Android home-screen widget. Included in the EAS production native project. */
class ScorevaLiveWidget : GlanceAppWidget() {
    override suspend fun provideGlance(context: Context, id: GlanceId) {
        provideContent {
            Column(modifier = GlanceModifier) {
                Text("LIVE 67'")
                Text("ARS  2")
                Text("CHE  1")
            }
        }
    }
}

class ScorevaLiveReceiver : GlanceAppWidgetReceiver() {
    override val glanceAppWidget: GlanceAppWidget = ScorevaLiveWidget()
}
