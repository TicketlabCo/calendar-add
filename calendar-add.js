class CalendarEntryCreator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="calendar-styles.css">
      <div class="calendar-add">
        <button class="calendar-add__button calendar-add__button--toggle" id="toggle-options">Add to Calendar</button>
        <div class="calendar-add__options" style="display: none;">
          <input type="text" class="calendar-add__input calendar-add__input--title" id="title" placeholder="Event Title">
          <input type="datetime-local" class="calendar-add__input calendar-add__input--start-time" id="start-time">
          <input type="datetime-local" class="calendar-add__input calendar-add__input--end-time" id="end-time">
          <textarea class="calendar-add__textarea" id="description" placeholder="Description"></textarea>
          <button class="calendar-add__button calendar-add__button--google" id="create-google">Create in Google Calendar</button>
          <button class="calendar-add__button calendar-add__button--outlook" id="create-outlook">Create in Outlook Calendar</button>
          <button class="calendar-add__button calendar-add__button--ical" id="create-ical">Create iCal File</button>
        </div>
      </div>
    `;

    this.googleButton = this.shadowRoot.getElementById('create-google');
    this.outlookButton = this.shadowRoot.getElementById('create-outlook');
    this.icalButton = this.shadowRoot.getElementById('create-ical');

    this.googleButton.addEventListener('click', () => this.createInGoogleCalendar());
    this.outlookButton.addEventListener('click', () => this.createInOutlookCalendar());
    this.icalButton.addEventListener('click', () => this.createICalFile());

    // Pull properties from attributes
    const eventName = this.getAttribute('event-name');
    const startTime = this.getAttribute('start-time');
    const endTime = this.getAttribute('end-time');
    const description = this.getAttribute('description');

    // Set the values of the input fields
    this.shadowRoot.getElementById('title').value = eventName || '';
    this.shadowRoot.getElementById('start-time').value = startTime || '';
    this.shadowRoot.getElementById('end-time').value = endTime || '';
    this.shadowRoot.getElementById('description').value = description || '';

    // Check for the 'show-add-button' attribute
    if (this.hasAttribute('show-add-button')) {
      this.shadowRoot.getElementById('toggle-options').style.display = 'flex'; // Show the button
      this.shadowRoot.querySelector('.calendar-add__options').style.display = 'none'; // Hide the options
    } else {
      this.shadowRoot.getElementById('toggle-options').style.display = 'none'; // Hide the button
      this.shadowRoot.querySelector('.calendar-add__options').style.display = 'flex'; // Show the options
    }

    // Add event listener for the toggle button
    this.shadowRoot.getElementById('toggle-options').addEventListener('click', () => {
      const options = this.shadowRoot.querySelector('.calendar-add__options');
      options.style.display = options.style.display === 'none' ? 'flex' : 'none'; // Toggle visibility
    });

    // Check for the 'hide-inputs' attribute
    if (this.hasAttribute('hide-inputs')) {
      this.shadowRoot.querySelectorAll('.calendar-add__input, .calendar-add__textarea').forEach(input => {
        input.style.display = 'none'; // Hide input fields
      });
    }
  }

  createInGoogleCalendar() {
    // 1. Get event details
    const title = this.shadowRoot.getElementById('title').value;
    const startTime = this.shadowRoot.getElementById('start-time').value;
    const endTime = this.shadowRoot.getElementById('end-time').value;
    const description = this.shadowRoot.getElementById('description').value;

    // 2. Construct Google Calendar event URL
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(description)}`;

    // 3. Open the URL in a new window/tab
    window.open(url, '_blank');
  }

  createInOutlookCalendar() {
    // 1. Get event details
    const title = this.shadowRoot.getElementById('title').value;
    const startTime = this.shadowRoot.getElementById('start-time').value;
    const endTime = this.shadowRoot.getElementById('end-time').value;
    const description = this.shadowRoot.getElementById('description').value;

    // 2. Construct Outlook Calendar event URL (using iCal format)
    const iCalString = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${title}\nDTSTART:${startTime}\nDTEND:${endTime}\nDESCRIPTION:${description}\nEND:VEVENT\nEND:VCALENDAR`;
    const encodedIcal = encodeURIComponent(iCalString);

    // 3. Construct Outlook Calendar URL
    const url = `mailto:?subject=${title}&body=body=${encodedIcal}`;

    // 4. Open the URL in a new window/tab
    window.open(url, '_blank');
  }

  createICalFile() {
    // 1. Get event details 
    const title = this.shadowRoot.getElementById('title').value;
    const startTime = this.shadowRoot.getElementById('start-time').value;
    const endTime = this.shadowRoot.getElementById('end-time').value;
    const description = this.shadowRoot.getElementById('description').value;

    // 2. Generate iCal content
    const iCalContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${title}\nDTSTART:${startTime}\nDTEND:${endTime}\nDESCRIPTION:${description}\nEND:VEVENT\nEND:VCALENDAR`;

    // 3. Create a Blob with the iCal content
    const blob = new Blob([iCalContent], { type: 'text/calendar' });

    // 4. Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    // 5. Create a hidden anchor element to trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'event.ics';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    // 6. Clean up
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  }
}

customElements.define('calendar-entry-creator', CalendarEntryCreator);