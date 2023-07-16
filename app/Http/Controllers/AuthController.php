<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignUpRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function Signup(SignUpRequest $request){
        $data = $request->validated();
        $user=User::create([
            'name'=>$data['name'],
            "email"=>$data['email'],
            "password"=>Hash::make($data['password'])
        ]);
        $token =$user->createToken('main')->plainTextToken;
        return response([
            'user'=>$user,
            'token'=>$token
        ]);
    }
    public function Login(LoginRequest $request){
        $credentials=$request->validated();
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);
        if(!Auth::attempt($credentials,$remember)){
            return response([
                'error'=>'The Provided Credentials are not correct'
            ],422);
        }
        $user=Auth::user();
        $token =$user->createToken('main')->plainTextToken;
        return response([
            'user'=>$user,
            'token'=>$token
        ]);
    }
    public function Logout(Request $request){
        $user =Auth::user();
        $user->currentAccessToken()->delete();
        return response([
            "success"=> true
        ],200);
    }



    public function test(){

    }
}
