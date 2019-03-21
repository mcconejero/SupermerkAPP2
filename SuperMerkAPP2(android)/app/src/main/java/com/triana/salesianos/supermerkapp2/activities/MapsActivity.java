package com.triana.salesianos.supermerkapp2.activities;

import android.arch.lifecycle.Observer;
import android.arch.lifecycle.ViewModelProviders;
import android.support.annotation.Nullable;
import android.support.v4.app.FragmentActivity;
import android.os.Bundle;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;
import com.triana.salesianos.supermerkapp2.R;
import com.triana.salesianos.supermerkapp2.models.MarketResponse;
import com.triana.salesianos.supermerkapp2.viewModel.MarketViewModel;

import java.util.List;

public class MapsActivity extends FragmentActivity implements OnMapReadyCallback {

    private GoogleMap mMap;
    private MarketViewModel viewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps);
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);
    }


    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;
        viewModel = ViewModelProviders.of(this).get(MarketViewModel.class);
        viewModel.getListMarket().observe(this, new Observer<List<MarketResponse>>() {
            @Override
            public void onChanged(@Nullable List<MarketResponse> markets) {
                for (MarketResponse m : markets){
                    if (!m.getLatlong().isEmpty()){
                        if(m.getLatlong().contains(", ")){
                            String[] part = m.getLatlong().split(", ");
                            double part1 = Double.parseDouble(part[0]);
                            double part2 = Double.parseDouble(part[1]);
                            LatLng temp = new LatLng(part1, part2);

                            MarkerOptions markerOptions = new MarkerOptions()
                                    .position(temp)
                                    .title(m.getName())
                                    .draggable(false);
                            Marker marker = mMap.addMarker(markerOptions);
                            marker.showInfoWindow();

                        } else {
                            String[] part = m.getLatlong().split(",");
                            double part1 = Double.parseDouble(part[0]);
                            double part2 = Double.parseDouble(part[1]);
                            LatLng temp = new LatLng(part1, part2);

                            MarkerOptions markerOptions = new MarkerOptions()
                                    .position(temp)
                                    .title(m.getName())
                                    .draggable(false);
                            Marker marker = mMap.addMarker(markerOptions);
                            marker.showInfoWindow();
                        }
                    }
                }
            }
        });

        LatLng test = new LatLng(37.38629, -6.002002);
        mMap.animateCamera(CameraUpdateFactory.newLatLngZoom(test, 13));
    }
}
