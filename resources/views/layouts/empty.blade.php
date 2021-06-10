<!DOCTYPE html>
<html>
    <head>
        <title> @yield('title') </title>
        <link rel="icon" href="{{url('/')}}/favicon.ico" sizes="16x16">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        
        @includeif('layouts.partial._default_css')
        @includeif('layouts.partial._css')
        @yield('myCss')
        <script>
            var SiteUrl = '{{url("/")}}';
            var Config = {
                brandName: "{{config('info.brandName')}}"
            };
        </script>
    </head>
    <body  >
        <div id="container" >
            
            <div class="row">
                @yield('content')
            </div>                  
                    
            @includeif('layouts.partial._modalLoader')
            @includeif('layouts.partial._default_js')
            @yield('myJs')
        </div>
    </body>
</html>
