<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class MyAppConfigProvider extends ServiceProvider {

    protected $defer = true;

    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot() {
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register() {
        //register UserRoleConfig
        $this->app->singleton('UserRoleConfig', function($app) {
            return new \App\Libs\Config\UserRoleConfig();
        });        
    }

    public function provides() {
        return [
            'UserRoleConfig',
        ];
    }
    
}
