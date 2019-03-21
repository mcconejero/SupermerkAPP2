package com.triana.salesianos.supermerkapp2.viewModel;

import android.app.Application;
import android.arch.lifecycle.AndroidViewModel;
import android.arch.lifecycle.MutableLiveData;
import android.support.annotation.NonNull;
import android.util.Log;

import com.triana.salesianos.supermerkapp2.models.MarketMapResponse;
import com.triana.salesianos.supermerkapp2.models.MarketResponse;
import com.triana.salesianos.supermerkapp2.models.ResponseContainer;
import com.triana.salesianos.supermerkapp2.models.ResponseContainerTwo;
import com.triana.salesianos.supermerkapp2.retrofit.generator.ServiceGenerator;
import com.triana.salesianos.supermerkapp2.retrofit.services.MarketService;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MarketViewModel extends AndroidViewModel{

    private MutableLiveData<List<MarketMapResponse>> listMarket = new MutableLiveData<List<MarketMapResponse>>();
    private MutableLiveData<MarketMapResponse> market = new MutableLiveData<MarketMapResponse>();

    private MarketService marketService;

    public MarketViewModel(@NonNull Application application){
        super(application);
        getAllMarkets();
    }

    public void getAllMarkets() {
        marketService = ServiceGenerator.createService(MarketService.class);
        Call<ResponseContainer<MarketMapResponse>> call = marketService.getListMarkets();
        call.enqueue(new Callback<ResponseContainer<MarketMapResponse>>() {
            @Override
            public void onResponse(Call<ResponseContainer<MarketMapResponse>> call, Response<ResponseContainer<MarketMapResponse>> response) {
                try {
                    ResponseContainer<MarketMapResponse> data = response.body();
                    listMarket.setValue(data.getRows());
                } catch (Exception e){
                    Log.d("onResponse", "Error here");
                    e.printStackTrace();
                }
            }

            @Override
            public void onFailure(Call<ResponseContainer<MarketMapResponse>> call, Throwable t) {
                Log.e("NetworkError", t.getMessage());
            }
        });
    }

    public void getMarketDetails(String id){
        marketService = ServiceGenerator.createService(MarketService.class);
        Call<ResponseContainerTwo<MarketMapResponse>> call = marketService.getMarket(id);
        call.enqueue(new Callback<ResponseContainerTwo<MarketMapResponse>>() {
            @Override
            public void onResponse(Call<ResponseContainerTwo<MarketMapResponse>> call, Response<ResponseContainerTwo<MarketMapResponse>> response) {
                try {
                    ResponseContainerTwo<MarketMapResponse> data = response.body();
                    market.setValue(data.getRows());

                } catch (Exception e){
                    Log.e("onResponse", response.message());
                }
            }

            @Override
            public void onFailure(Call<ResponseContainerTwo<MarketMapResponse>> call, Throwable t) {
                Log.e("onFailureSetFav", t.getMessage());
            }
        });
    }

    public MutableLiveData<List<MarketMapResponse>> getListMarket(){
        return listMarket;
    }
    public MutableLiveData<MarketMapResponse> getMarket(){
        return market;
    }
}
