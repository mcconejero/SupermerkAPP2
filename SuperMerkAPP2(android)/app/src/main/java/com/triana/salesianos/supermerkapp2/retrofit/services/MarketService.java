package com.triana.salesianos.supermerkapp2.retrofit.services;

import com.triana.salesianos.supermerkapp2.models.MarketMapResponse;
import com.triana.salesianos.supermerkapp2.models.MarketResponse;
import com.triana.salesianos.supermerkapp2.models.ResponseContainer;
import com.triana.salesianos.supermerkapp2.models.ResponseContainerTwo;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface MarketService {

    @GET("markets")
    Call<ResponseContainer<MarketMapResponse>> getListMarkets();

    @GET("markets/{id}")
    Call<ResponseContainerTwo<MarketMapResponse>> getMarket(@Path("id") String id);

}
