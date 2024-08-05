const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

jasmine.getEnv().addReporter(new SpecReporter({
    spec: {
        displayPending: true,
        displayDuration: true
    },
    summary: {
        displayDuration: true
    }
}));
