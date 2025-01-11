# Calendar Entry Creator

## Overview
The Calendar Entry Creator is a web component that allows users to create calendar events easily. It supports integration with Google Calendar, Outlook Calendar, and the ability to download events as iCal files. The component is built using Web Components standards, ensuring encapsulation and reusability.

## Features
- **Custom Web Component**: Built using the Web Components API, allowing for easy integration into any web application.
- **Pre-fill Event Details**: Supports attributes to pre-fill event name, start time, end time, and description.
- **Multiple Calendar Integrations**: Create events in Google Calendar, Outlook Calendar, or download as an iCal file.
- **Responsive Design**: Styled with CSS for a clean and user-friendly interface.

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Open `index.html` in your web browser to view the component in action.

## Usage
To use the `calendar-entry-creator` component, include it in your HTML file as follows:
```
<calendar-entry-creator
  event-name="Your Event Name"
  start-time="2023-10-01T10:00:00Z"
  end-time="2023-10-01T11:00:00Z"
  description="A brief description of the event">
</calendar-entry-creator>
```

## Attributes
- **event-name**: The name of the event.
- **start-time**: The start time of the event in ISO format.
- **end-time**: The end time of the event in ISO format.
- **description**: A brief description of the event.

## Development
### File Structure
- `calendar-add.js`: Contains the logic for the calendar entry creator component.
- `calendar-add.html`: The HTML file that demonstrates the usage of the component.
- `calendar-styles.css`: The CSS file for styling the component.

### Running Locally
To run the project locally, simply open the `calendar-add.html` file in your web browser. You can edit the JavaScript and CSS files to customize the functionality and appearance of the component.

## Contributing
Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

