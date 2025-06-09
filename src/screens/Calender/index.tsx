import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { moderateScale } from '../../utils/metrics';
import { formatFullDateWithComma } from '../../utils/utils';
import { Themes } from '../../utils/themes';


const startOfWeek = (date: Date) => {
  const day = date.getDay();
  const diff = date.getDate() - day;
  return new Date(date.getFullYear(), date.getMonth(), diff);
};

const endOfWeek = (date: Date) => {
  const start = startOfWeek(date);
  return new Date(start.getFullYear(), start.getMonth(), start.getDate() + 6);
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
};

const installers = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Mike Johnson' },
];

const timeSlots = Array.from({ length: 12 }, (_, i) => `${8 + i}:00`);

const dayViewEvents = [
  {
    title: 'Work A',
    installerId: '1',
    date: '2025-06-05',  
    time: '09:00',
    status: 'Replacement', 
  },
  {
    title: 'Work B',
    installerId: '2',
    date: '2025-06-05',
    time: '11:00',
    status: 'Repair', 
  },
  {
    title: 'Work C',
    installerId: '1',
    date: '2025-06-06',
    time: '13:00',
    status: 'Calibration',
  },
];


const weekViewEvents = [
  {
    title: 'Work week A',
    installerId: '1',
    date: '2025-06-06', 
    status: 'Calibration',
  },
  {
    title: 'Work week B',
    installerId: '2',
    date: '2025-06-05',
    status: 'Repair',
  },
  {
    title: 'Work week C',
    insimtallerId: '1',
    date: '2025-06-07',
    status: 'Replacement',
  },
];



const CalendarScreen = () => {
  const [viewMode, setViewMode] = useState<'day' | 'week'>('week');
  const [currentDate, setCurrentDate] = useState(new Date());

  const weekStart = startOfWeek(currentDate);
  const weekEnd = endOfWeek(currentDate);
  const weekRange = `${formatDate(weekStart)} - ${formatDate(weekEnd)}`;

 const goToPrev = () => {
  setCurrentDate(prev => {
    const d = new Date(prev);
    d.setDate(prev.getDate() - (viewMode === 'week' ? 7 : 1));
    return d;
  });
};

const goToNext = () => {
  setCurrentDate(prev => {
    const d = new Date(prev);
    d.setDate(prev.getDate() + (viewMode === 'week' ? 7 : 1));
    return d;
  });
};


 const renderDayView = () => {
  const getColorByStatus = (status: string) => {
    switch (status) {
      case 'Calibration':
        return '#8BC34A'; // Green
      case 'Repair':
        return '#2196F3'; // Blue
      case 'Replacement':
        return '#F44336'; // Red
      default:
        return '#BDBDBD'; // Grey fallback
    }
  };

  const currentDayString = currentDate.toDateString();

  // Filter events for selected day
const filteredEvents = dayViewEvents.filter(event => {
  const eventDate = new Date(event.date);
  const [hours, minutes] = event.time.split(':').map(Number);
  eventDate.setHours(hours, minutes, 0, 0);

  // Compare eventDate's day with currentDate's day (ignore time part in comparison)
  return (
    eventDate.toDateString() === currentDate.toDateString()
  );
});



  return (
    <View style={{ flexDirection: 'row', flex: 1 }}>
      {/* Installer Column */}
      <View style={styles.installerColumn}>
      <View style={{ height: moderateScale(32),  borderColor: '#eee',borderWidth:0.5 }} />
        {installers.map(installer => (
          <View key={installer.id} style={styles.installerCell}>
            <Text style={styles.installerText}>{installer.name}</Text>
          </View>
        ))}
      </View>

      {/* Time Grid */}
      <ScrollView horizontal style={{ flex: 1 }}>
        <View>
          {/* Time Header Row */}
          <View style={styles.timeHeaderRow}>
            {timeSlots.map(time => (
              <View key={time} style={styles.timeHeaderCell}>
                <Text style={styles.timeText}>{time}</Text>
              </View>
            ))}
          </View>

          {/* Event Rows */}
          {installers.map(installer => (
            <View key={installer.id} style={styles.installerRow}>
              {timeSlots.map(time => {
                const event = filteredEvents.find(
                  e => e.installerId === installer.id && e.time === time
                );

                return (
                  <View key={time} style={styles.timeCell}>
                    {event && (
                      <View
                        style={[
                          styles.eventBox,
                          { backgroundColor: getColorByStatus(event.status) },
                        ]}
                      >
                        <Text style={styles.eventText}>{event.title}</Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};


  const renderWeekView = () => {
    const getColorByStatus = (status: string) => {
      switch (status) {
      case 'Calibration':
        return '#8BC34A'; // Green
      case 'Repair':
        return '#2196F3'; // Blue
      case 'Replacement':
        return '#F44336'; // Red
      default:
        return '#BDBDBD'; // Grey fallback
    }
    };

    const daysOfWeek = Array.from({ length: 7 }).map((_, index) => {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + index);
      return {
        label: date.toLocaleDateString(undefined, {
          weekday: 'short',
          day: 'numeric',
        }),
        value: date.toISOString().split('T')[0],
      };
    });

    return (
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <View style={{ height: 60, borderBottomWidth: 1, borderColor: '#ccc' }} />
        {/* Installer Column */}
        <View style={styles.installerColumn}>
          {installers.map(installer => (
            <View key={installer.id} style={styles.installerCell}>
              <Text style={styles.installerText}>{installer.name}</Text>
            </View>
          ))}
        </View>

        {/* Days Grid */}
        <ScrollView horizontal style={{ flex: 1 }}>
          <View>
            {/* Day Headers */}
            <View style={styles.timeHeaderRow}>
              {daysOfWeek.map(day => (
                <View key={day.value} style={styles.timeHeaderCell}>
                  <Text style={styles.timeText}>{day.label}</Text>
                </View>
              ))}
            </View>

            {/* Grid Rows */}
            {installers.map(installer => (
              <View key={installer.id} style={styles.installerRow}>
                {daysOfWeek.map(day => {
                  const event = weekViewEvents.find(
                    e =>
                      e.installerId === installer.id &&
                      e.date === day.value,
                  );

                  return (
                    <View key={day.value} style={styles.timeCell}>
                      {event && (
                        <View
                          style={[
                            styles.eventBox,
                            { backgroundColor: getColorByStatus(event.status) },
                          ]}
                        >
                          <Text style={styles.eventText}>{event.title}</Text>
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goToPrev} style={styles.button}>
          <Text style={styles.buttonText}>Prev</Text>
        </TouchableOpacity>

        <Text style={styles.weekRange}>
  {viewMode === 'week'
    ? `${formatDate(startOfWeek(currentDate))} - ${formatDate(endOfWeek(currentDate))}`
    : formatFullDateWithComma(currentDate.toDateString())}
</Text>

        <TouchableOpacity onPress={goToNext} style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Toggle View */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          onPress={() => setViewMode('day')}
          style={[styles.toggleButton, viewMode === 'day' && styles.activeButton]}
        >
          <Text style={[styles.toggleText,viewMode==='week' &&{color:Themes.darkGray}]}>Day</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setViewMode('week')}
          style={[styles.toggleButton, viewMode === 'week' && styles.activeButton]}
        >
          <Text style={[styles.toggleText,viewMode === 'day'&&{color:Themes.darkGray}]}>Week</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar View */}
      {viewMode === 'week' ? (
        renderWeekView()
      ) : (
        renderDayView()
      )}

    </SafeAreaView>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal:moderateScale(40),
    marginTop:moderateScale(10)
  },
  button: {
    backgroundColor: '#007bff',
    width:moderateScale(50),
    height:moderateScale(25),
    borderRadius: moderateScale(5),
    justifyContent: 'center',
  alignItems: 'center',  
  },
  buttonText: { color: '#fff' },
  weekRange: { fontWeight: 'bold', fontSize: 16 },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  toggleButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  toggleText: { color: '#fff', fontWeight: '600' },
  installerColumn: {
    width: 100,
    backgroundColor: '#f5f5f5',
  },
  installerCell: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
    borderWidth:1
  },
  installerText: {
    fontWeight: '500',
    fontSize: 13,
    textAlign: 'center',
  },

  timeHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#fafafa',
    borderBottomWidth: 1,
    borderColor: '#eee',
    borderWidth:1,
    height:moderateScale(32),
  },
  timeHeaderCell: {
    width: 80,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#eee',
    borderWidth:1
  },
  timeText: { fontSize: 12 },

  installerRow: {
    flexDirection: 'row',
    height: 60,
  },
  timeCell: {
    width: 80,
    borderWidth:1,
    borderColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },

  eventBox: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 4,
    minWidth: 60,
  },
  eventText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },

});
