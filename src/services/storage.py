from localStoragePy import localStoragePy


local_storage = localStoragePy('contacts', "json")

class Storage:
    
    def __init__(self, access_token: str = None, refresh_token: str = None) -> None:        
        self.access_token = access_token
        self.refresh_token = refresh_token