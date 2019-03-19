package com.triana.salesianos.supermerkapp2.retrofit.services;

import com.triana.salesianos.supermerkapp2.models.LoginResponse;
import com.triana.salesianos.supermerkapp2.models.SignUp;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Header;
import retrofit2.http.POST;

public interface LoginService {

    @POST("/auth")
    Call<LoginResponse> doLogin(@Header("Authorization") String authorization);

    @POST("/users")
    Call<LoginResponse> doSignUp(@Body SignUp signup);

}
