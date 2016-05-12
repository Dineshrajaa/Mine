//welcome to angular

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'onezone-datepicker'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {


    $stateProvider

        .state('landing', {
        url: '/landing',
        templateUrl: 'templates/landing.html'
    })






    .state('landing.userReg', {
        url: '/userReg',
        views: {
            'landing-view': {
                templateUrl: 'login/templates/userRegistration.html',
                controller: 'userRegCtrl'
            }
        }

    })


    .state('landing.login', {
        url: '/login',
        views: {
            'landing-view': {
                templateUrl: 'login/templates/login.html',
                controller: 'loginCtrl'
            }
        }

    })

    .state('landing.passwordSetup', {
        url: '/passwordSetup',
        views: {
            'landing-view': {
                templateUrl: 'login/templates/passwordSetup.html',
                controller: 'passwordSetupCtrl'
            }
        }

    })

    .state('landing.createprofile', {
        url: '/createprofile',
        params: { myParam: null },
        views: {
            'landing-view': {
                templateUrl: 'profile/templates/createprofile.html',
                controller: 'createprofileCtrl'
            }
        }

    })


    .state('landing.profile', {
        url: '/profile/',
        cache: false,
        params: { myParam: null },
        views: {
            'landing-view': {
                templateUrl: 'profile/templates/userProfile.html',
                controller: 'userProfileCtrl'
            }
        }

    })

    .state('landing.employment', {
        url: '/employment/',
        params: { myParam: null },
        views: {
            'landing-view': {
                templateUrl: 'profile/templates/employment.html',
                controller: 'employmentCtrl'
            }
        }

    })


    .state('landing.profileSetup', {
            url: '/profileSetup',
            views: {
                'landing-view': {
                    templateUrl: 'profile/templates/userProfileSetup.html',
                    controller: 'userProfileSetupCtrl',
                    reload: true
                }
            }

        })
        .state('landing.wellnessList', {
            url: '/wellnessList',
            params: { myParam: null },
            views: {
                'landing-view': {
                    templateUrl: 'wellness/templates/wellnessList.html',
                    controller: 'wellnessListCtrl'
                }
            }

        })


    .state('menu.adminData', {
            url: '/adminData',
            params: { myParam: null },
            views: {
                'menuContent': {
                    templateUrl: 'utilities/templates/adminData.html',
                    controller: 'adminDataCtrl'
                }
            }
        })
        .state('landing.healthCareProvider', {
            url: '/healthCareProvider',
            cache: false,
            params: { myParam: null },
            views: {
                'landing-view': {
                    templateUrl: 'utilities/templates/healthCareProvider.html',
                    controller: 'healthCareProviderCtrl'
                }
            }
        })

    .state('landing.healthCareProviderlist', {
        url: '/healthCareProviderlist',
        params: { myParam: null },
        views: {
            'landing-view': {
                templateUrl: 'utilities/templates/healthcareproviderlist.html',
                controller: 'healthcareproviderlistCtrl'
            }
        }
    })

    .state('landing.insurance', {
        url: '/insurance',
        cache: false,
        params: { myParam: null },
        views: {
            'landing-view': {
                templateUrl: 'utilities/templates/insurance.html',
                controller: 'insuranceCtrl'
            }
        }
    })

    .state('landing.emergency', {
        url: '/emergency',
        cache: false,
        params: { myParam: null },
        views: {
            'landing-view': {
                templateUrl: 'utilities/templates/EmergencyContacts.html',
                controller: 'emergencyCtrl'
            }
        }
    })

    .state('landing.documents', {
        url: '/documents',
        cache: false,
        params: { myParam: null },
        views: {
            'landing-view': {
                templateUrl: 'utilities/templates/Documents.html',
                controller: 'documentsCtrl'
            }
        }
    })






    .state('landing.allergies', {
        url: '/allergies',
        cache: false,
        params: { myParam: null },
        views: {
            'landing-view': {
                templateUrl: 'wellness/templates/allergies.html',
                controller: 'allergiesCtrl'
            }
        }
    })

    .state('menu', {
        url: '/menu',
        cache: false,
        templateUrl: 'wellness/templates/menu.html',
        controller: 'menuCtrl'
    })

    .state('menu.allergieslist', {
        url: '/allergieslist',
        reload: true,
        params: { myParam: null },
        views: {
            'menuContent': {
                templateUrl: 'wellness/templates/allergieslist.html',
                controller: 'allergieslistCtrl'
            }
        }
    })


    .state('landing.vaccines', {
        url: '/vaccines',
        cache: false,
        params: { myParam: null },
        views: {
            'landing-view': {
                templateUrl: 'wellness/templates/vaccines.html',
                controller: 'vaccinesCtrl'
            }
        }
    })


    .state('menu.vaccineslist', {
        url: '/vaccineslist',
        params: { myParam: null },
        views: {
            'menuContent': {
                templateUrl: 'wellness/templates/vaccineslist.html',
                controller: 'vaccineslistCtrl'
            }
        }
    })

    .state('landing.medicalhistory', {
            url: '/medicalhistory',
            cache: false,
            params: { myParam: null },
            views: {
                'landing-view': {
                    templateUrl: 'wellness/templates/medicalhistory.html',
                    controller: 'medicalhistoryCtrl'
                }
            }
        })
        .state('landing.medicalHistoryView', {
            url: '/medicalHistoryView',
            params: { myParam: null },
            views: {
                'landing-view': {
                    templateUrl: 'wellness/templates/medicalHistoryView.html',
                    controller: 'medicalViewCtrl'
                }
            }
        })
        .state('menu.medicalHistorylist', {
            url: '/medicalHistorylist',
            params: { myParam: null },
            views: {
                'menuContent': {
                    templateUrl: 'wellness/templates/listmedicalhistory.html',
                    controller: 'medicalHistorylistCtrl'
                }
            }
        })
        .state('landing.social', {
            url: '/social',
            cache: false,
            params: { myParam: null },
            views: {
                'landing-view': {
                    templateUrl: 'wellness/templates/social.html',
                    controller: 'socialhistoryCtrl'
                }
            }
        })

    .state('menu.sociallist', {
        url: '/sociallist',
        params: { myParam: null },
        views: {
            'menuContent': {
                templateUrl: 'wellness/templates/sociallist.html',
                controller: 'sociallistCtrl'
            }
        }
    })


    .state('landing.drugs', {
        url: '/drugs',
        cache: false,
        params: { myParam: null },
        views: {
            'landing-view': {
                templateUrl: 'wellness/templates/drugs.html',
                controller: 'drugsCtrl'
            }
        }
    })

    .state('menu.drugslist', {
        url: '/drugslist',
        params: { myParam: null },
        views: {
            'menuContent': {
                templateUrl: 'wellness/templates/drugslist.html',
                controller: 'drugslistCtrl'
            }
        }
    })



    .state('landing.surgeries', {
        url: '/surgeries',
        cache: false,
        params: { myParam: null },
        views: {
            'landing-view': {
                templateUrl: 'wellness/templates/surgeries.html',
                controller: 'surgeriesCtrl'
            }
        }
    })

    .state('menu.surgerieslist', {
        url: '/surgerieslist',
        params: { myParam: null },
        views: {
            'menuContent': {
                templateUrl: 'wellness/templates/surgerieslist.html',
                controller: 'surgerieslistCtrl'
            }
        }
    })

    .state('landing.doctorvisits', {
        url: '/doctorvisits',
        cache: false,
        params: { myParam: null },
        views: {
            'landing-view': {
                templateUrl: 'wellness/templates/doctorvisits.html',
                controller: 'doctorvisitsCtrl'
            }
        }
    })

    .state('menu.doctorvisitlist', {
            url: '/doctorvisitlist',
            params: { myParam: null },
            views: {
                'menuContent': {
                    templateUrl: 'wellness/templates/doctorvisitlist.html',
                    controller: 'doctorvisitlistCtrl'
                }
            }
        })
        .state('menu.biometry', {
            url: '/biometry',
            cache: false,
            params: { myParam: null },
            views: {
                'menuContent': {
                    templateUrl: 'wellness/templates/biometry.html',
                    controller: 'biometryCtrl'
                }
            }
        })

    .state('menu.currentconditions', {
        url: '/currentconditions',
        params: { myParam: null },
        views: {
            'menuContent': {
                templateUrl: 'wellness/templates/currentconditions.html',
                controller: 'currentconditionsCtrl'
            }
        }
    })

    .state('menu.medicaltests', {
        url: '/medicaltests',
        cache: false,
        params: { myParam: null },
        views: {
            'menuContent': {
                templateUrl: 'wellness/templates/medicaltests.html',
                controller: 'medicaltestsCtrl'
            }
        }
    })

    .state('menu.calendar', {
        url: '/calendar',
        cache: false,
        params: { myParam: null },
        views: {
            'menuContent': {
                templateUrl: 'wellness/templates/calendar.html',
                controller: 'calendarCtrl'
            }
        }
    })

    .state('landing.medical', {
        url: '/medical',
        views: {
            'landing-view': {
                templateUrl: 'wellness/templates/medical.html',
                controller: 'medicalCtrl'
            }
        }
    })

    .state('landing.biosignal', {
            url: '/biosignal',
            views: {
                'landing-view': {
                    templateUrl: 'wellness/templates/biosignal.html',
                    controller: 'biosignalCtrl'
                }
            }
        })
        .state('menu.events', {
            url: '/events',
            cache: false,
            params: { myParam: null },
            views: {
                'menuContent': {
                    templateUrl: 'utilities/templates/events.html',
                    controller: 'eventsCtrl'
                }
            }
        })
        .state('menu.reminder', {
            url: '/reminder',
            cache: false,
            params: { myParam: null },
            views: {
                'menuContent': {
                    templateUrl: 'utilities/templates/reminder.html',
                    controller: 'reminderCtrl'
                }
            }
        })
        .state('menu.notes', {
            url: '/notes',
            cache: false,
            params: { myParam: null },
            views: {
                'menuContent': {
                    templateUrl: 'utilities/templates/notes.html',
                    controller: 'notesCtrl'
                }
            }
        })
        .state('menu.aboutUs', {
            url: '/aboutUs',
            views: {
                'menuContent': {
                    templateUrl: 'utilities/templates/aboutUs.html',
                    controller: 'aboutUsCtrl'
                }
            }
        })

    .state('landing.welcome', {
        url: '/welcome',
        views: {
            'landing-view': {
                templateUrl: 'utilities/templates/welcome.html',
                controller: 'welcomeCtrl'
            }
        }
    });




    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/landing/login');

});
