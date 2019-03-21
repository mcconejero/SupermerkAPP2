package com.triana.salesianos.supermerkapp2.fragments;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.triana.salesianos.supermerkapp2.R;
import com.triana.salesianos.supermerkapp2.UtilToken;
import com.triana.salesianos.supermerkapp2.activities.LoginActivity;
import com.triana.salesianos.supermerkapp2.models.ProductResponse;
import com.triana.salesianos.supermerkapp2.models.ResponseContainer;
import com.triana.salesianos.supermerkapp2.retrofit.generator.AuthType;
import com.triana.salesianos.supermerkapp2.retrofit.generator.ServiceGenerator;
import com.triana.salesianos.supermerkapp2.retrofit.services.ProductService;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class FavFragment extends Fragment {

    // TODO: Customize parameter argument names
    private static final String ARG_COLUMN_COUNT = "column-count";
    // TODO: Customize parameters
    private int mColumnCount = 1;
    private OnListFragmentInteractionListener mListener;
    Context ctx = getContext();
    List<ProductResponse> product = new ArrayList<>();
    ProductService service;
    MyProductRecyclerViewAdapter adapter;
    String jwt;

    public FavFragment() {
    }

    @SuppressWarnings("unused")
    public static FavFragment newInstance(int columnCount) {
        FavFragment fragment = new FavFragment();
        Bundle args = new Bundle();
        args.putInt(ARG_COLUMN_COUNT, columnCount);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        jwt = UtilToken.getToken(getContext());

        if (jwt == null) {
            Intent i = new Intent(getActivity(), LoginActivity.class);
            startActivity(i);
        }
        if (getArguments() != null) {
            mColumnCount = getArguments().getInt(ARG_COLUMN_COUNT);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_fav_list, container, false);

        // Set the adapter
        if (view instanceof RecyclerView) {
            Context context = view.getContext();
            RecyclerView recyclerView = (RecyclerView) view;
            if (mColumnCount <= 1) {
                recyclerView.setLayoutManager(new LinearLayoutManager(context));
            } else {
                recyclerView.setLayoutManager(new GridLayoutManager(context, mColumnCount));
            }
            service = ServiceGenerator.createService(ProductService.class, jwt, AuthType.JWT);

            Call<ResponseContainer<ProductResponse>> call = service.getFavs();
            call.enqueue(new Callback<ResponseContainer<ProductResponse>>() {
                @Override
                public void onResponse(Call<ResponseContainer<ProductResponse>> call, Response<ResponseContainer<ProductResponse>> response) {
                    if (response.code() != 200) {
                        Toast.makeText(getActivity(), "Error in request", Toast.LENGTH_SHORT).show();
                    } else {
                        product = response.body().getRows();

                        adapter = new MyProductRecyclerViewAdapter(context, product, mListener);
                        recyclerView.setAdapter(adapter);

                    }
                }

                @Override
                public void onFailure(Call<ResponseContainer<ProductResponse>> call, Throwable t) {
                    Log.e("NetworkFailure", t.getMessage());
                    Toast.makeText(getActivity(), "Error de conexión", Toast.LENGTH_SHORT).show();
                }
            });
        }
        return view;
    }


    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnListFragmentInteractionListener) {
            mListener = (OnListFragmentInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnListFragmentInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    public interface OnListFragmentInteractionListener extends ProductFragment.OnListFragmentInteractionListener {
        // TODO: Update argument type and name
        void onListFragmentInteraction(ProductResponse item);
    }
}
